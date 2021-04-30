import fs from 'fs';
import json2xls from 'json2xls';

module.exports = (json) => {
    let xls = json2xls(json);
    fs.writeFileSync('data.xlsx', xls);
}
