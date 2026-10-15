#!/usr/bin/env node
// Fail-closed GO/NO-GO. Does not deploy, change authorization, merge or contact users.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {dirname} from 'node:path';
import {spawnSync} from 'node:child_process';
const file=(name)=>readFileSync(new URL('../'+name,import.meta.url));
const parse=(name)=>JSON.parse(file(name).toString('utf8'));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const args=process.argv.slice(2);
const at=args.indexOf('--out');
if(at>=0 && !args[at+1]) throw Error('--out needs a file');
const dest=at>=0?args[at+1]:null;
const flag=args.includes('--require-ready');
for(const a of args)if(!['--out','--require-ready',dest].includes(a))throw Error('Unknown argument '+a);
const wave8=parse('docs/ONDA_8_READINESS.json');
const audit=parse('docs/AUDITORIA_ONDA7_MACHINE.json');
const release=parse('docs/ONDA_9_GO_NO_GO.json');
for(const obj of [wave8,audit,release])assert.equal(obj.product,'Trilha da Clareza');
assert.equal(wave8.requirements.length,12);
assert.equal(audit.controls.length,30);
assert.equal(release.required_signoffs.length,8);
const counts={PASS:0,PARTIAL:0,BLOCKED:0};
for(const item of audit.controls){
  assert.ok(Object.hasOwn(counts,item.status),'Unknown status '+item.status);
  counts[item.status]++;
}
const incomplete=wave8.requirements.filter(x=>x.approved!==true).map(x=>x.id);
const unsigned=release.required_signoffs.filter(x=>x.approved!==true).map(x=>x.id);
const humanPilot=wave8.recruitment_authorized===true &&
  wave8.pilot_with_people_authorized===true &&
  wave8.patient_use_authorized===true &&
  Number(wave8.evidence.clinical_pilot_sessions)>0;
const all30=counts.PASS===30 && counts.PARTIAL===0 && counts.BLOCKED===0;
const approved=release.release_approved===true &&
  release.patient_use_authorized===true &&
  release.merge_authorized===true &&
  release.rollback_plan_approved===true && unsigned.length===0;
const ready=incomplete.length===0 && all30 && humanPilot && approved;
const filenames=['index.html','style.css','dist/app.js','dist/domain.js','dist/content.js','assets/favicon.svg'];
const assets=filenames.map(path=>({path,bytes:file(path).length,sha256:sha(file(path))}));
const rev=spawnSync('git',['rev-parse','HEAD'],{encoding:'utf8'});
const report={
  product:'Trilha da Clareza',stage:'Onda 9',type:'PREPUBLICACAO',
  decision:ready?'GO_ELIGIBLE_FOR_HUMAN_REVIEW':'NO_GO',
  clinical_approval_conferred:false,merge_executed:false,deploy_executed:false,
  patient_distribution_executed:false,ready_for_human_review:ready,
  wave8_gate_count:12,unresolved_wave8_gates:incomplete,
  audit_30_controls:counts,unapproved_release_signoffs:unsigned,
  human_pilot_evidence_satisfied:humanPilot,
  candidate_commit:rev.status===0?rev.stdout.trim():null,
  candidate_asset_hashes:assets,
  warning:'No automatic clinical release. Final authorization must be human, documented, version-specific, and independently reviewed.'
};
if(dest){
  mkdirSync(dirname(dest),{recursive:true});
  writeFileSync(dest,JSON.stringify(report,null,2)+'\n',{encoding:'utf8'});
}
console.log('ONDA9 '+report.decision+' | canônico '+counts.PASS+' PASS / '+counts.PARTIAL+' PARCIAL / '+counts.BLOCKED+' BLOQUEADO | gates '+incomplete.length+'/12 pendentes | autorizações '+unsigned.length+'/8 pendentes');
if(flag&&!ready){console.error('BLOQUEADO: nenhum merge, deploy ou uso assistencial autorizado.');process.exitCode=2;}
