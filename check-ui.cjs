const fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync('dist/index.html','utf8');
const css=fs.readFileSync('dist/mobile.css','utf8');
const app=fs.readFileSync('dist/app.js','utf8');
const workflow=fs.readFileSync('dist/workflow.js','utf8');

for(const asset of ['style.css','mobile.css','workflow.css','app.js','workflow.js'])
  assert.match(html,new RegExp(asset.replace('.','\\.')),`missing asset ${asset}`);
assert.match(css,/@media/,'mobile media queries are missing');
assert.match(css,/overflow-x\s*:\s*hidden/,'mobile horizontal overflow guard is missing');
for(const route of ['sale','sales','returns','stock','purchases','suppliers','customers','cheques','defects','expenses','closing','reports','settings'])
  assert.match(app+workflow,new RegExp(`['"]${route}['"]`),`missing route ${route}`);
for(const name of ['purchaseForm','savePurchase','saleView','saveSale','tenderFields','chequeView','view','render']) {
  const count=(app+workflow).split(/\r?\n/).reduce((n,line)=>n+    +new RegExp(`(?:^|[;{}])${name}\\s*=`).test(line),0);
  assert.ok(count<=1,`duplicate final definition for ${name}`);
}
console.log('PASS: production assets, mobile CSS, required routes and single final definitions.');
