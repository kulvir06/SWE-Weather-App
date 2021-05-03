import fs from 'fs';
import converter from 'json-2-csv';

module.exports = (json) => {
    converter.json2csv(json, (err, csv) => {
        if (err) {
            throw err;
        }
        console.log(csv);
        fs.writeFileSync('data.csv', csv);
        
    });
}
