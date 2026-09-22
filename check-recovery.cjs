const source=require('node:fs').readFileSync('check-flows.cjs','utf8');
new Function('require',source+`
vm.runInContext(fs.readFileSync('dist/workflow.js','utf8'),sandbox);
run("db=seed();route='recovery';recoveryDraft={c1:{amount:'1000',method:'Cash'},c3:{amount:'500',method:'Bank'}};saveRecoveries()");
eq("customerBalance('c1')",24000);eq("customerBalance('c3')",8000);eq('db.payments.length',2);
eq("db.payments.filter(p=>p.method==='Cash')[0].amount",1000);
run('saveRecoveries()');eq('db.payments.length',2);
run("recoveryDraft={c1:{amount:'100',method:'Cash'},c3:{amount:'-5',method:'Cash'}};saveRecoveries()");eq('db.payments.length',2);eq("customerBalance('c1')",24000);
run("recoveryDraft={c2:{amount:'500',method:'Bank'}};saveRecoveries()");eq("customerBalance('c2')",-500);
console.log('PASS: bulk recovery updates separate khatas, cash/bank, no duplicate submit, atomic validation and advance.');
`)(require);
