const source=require('node:fs').readFileSync('check-flows.cjs','utf8');
new Function('require',source+`
vm.runInContext(fs.readFileSync('dist/workflow.js','utf8'),sandbox);
for(const s of ['.receipt','#party-form'])node(s).insertAdjacentHTML=function(where,html){this.innerHTML+=html};
run('db=seed();db.cheques=[];resetCart();');
run("entryProduct='p1'");node('#entry-qty').value='3';node('#entry-price').value='1900';run('addEntry()');eq('cart[0].qty',3);eq('cart[0].price',1900);
run("customer='c1';dueDate='2026-10-01';padNumber='PAD-42'");
for(const[k,v]of Object.entries({cash:'1000',bank:'1700',cheque:'3000',number:'CH-001',bankName:'Demo bank',date:'2026-10-01',phone:'03001234567',address:'Shop 12, Market'}))node('#sale-'+k).value=v;
run('saveSale()');eq('db.sales[0].paid',2700);eq('db.sales[0].padNumber','PAD-42');eq('db.sales[0].contact.address','Shop 12, Market');eq('db.cheques[0].status','Pending');eq("customerBalance('c1')",28000);eq('cashTotals(today()).sales',1000);
node('#cheque-status').value='Cleared';node('#cheque-clear-date').value='2026-10-01';run('saveChequeOutcome(db.cheques[0].id)');eq("customerBalance('c1')",25000);run('saveChequeOutcome(db.cheques[0].id)');eq("customerBalance('c1')",25000);
run("returnCustomer='c1';returnQuery='Printed Lawn'");eq('findReturnMatches()[0].sale.padNumber','PAD-42');eq('findReturnMatches()[0].item.price',1900);run("returnCustomer='c2'");eq('findReturnMatches().length',0);
console.log('PASS: keyboard item staging, custom price, pad/contact snapshots, cash/bank split, pending cheque, idempotent clearance, customer-scoped latest purchase.');
`)(require);
