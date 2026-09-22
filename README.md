# Kapra Khata

Interactive wholesale clothing management UI. Static HTML, CSS and JavaScript; no runtime dependencies.

Open the hosted site, or run `npm run dev` for local development. The default page is New Sale. Navigation is in the top-left drawer.

## Working demo flows

- Sales, quantities, discounts, payments, due dates and printable receipts.
- Batch-specific product codes and printable Code 128 labels. Keyboard-emulating scanner input adds products without a scan control on the sale screen.
- Supplier deliveries, stock, counts, rack locations and movements.
- Customer and supplier ledgers, payments, advances and customer installment plans.
- Original-invoice partial returns, proportional discount credit, refunds and return receipts.
- Quarantined defects, supplier dispatch, approved credits and replacements.
- Held bills, quotations, reservations and partial order fulfillment.
- Expenses, daily cash-count snapshots, reports and CSV export.
- Browser-local JSON backup and restore, shop settings and activity history.

## Scope

This is a working owner-workspace prototype with sample data saved in localStorage on the current browser. It is not a production ERP or a secure shared database. Staff authentication and enforced permissions, multi-device synchronization, automated backups, per-piece serialization, tax configuration and physical printer/scanner verification require production implementation. Purchase entry currently receives one batch/colour/size line per form. Management profit figures are estimates.

Run `node check-flows.cjs` to verify core accounting and stock transitions. Browser UI checks covered sale saving, original-invoice returns and proportional credit. WebMCP registration is feature-detected; the preview browser did not support its runtime API, so WebMCP execution was not verified.
