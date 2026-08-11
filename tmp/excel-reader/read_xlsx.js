const xlsx = require('xlsx');
const fs = require('fs');
const workbook = xlsx.readFile('../../public/MIDEX_Arabic_Website_Language_Audit.xlsx');
const result = {};
for (const sheetName of workbook.SheetNames) {
  result[sheetName] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
}
fs.writeFileSync('output.json', JSON.stringify(result, null, 2));
console.log('Done converting to output.json');
