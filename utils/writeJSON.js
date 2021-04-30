const Fs = require('fs')
const path  = 'C:/Users/kulvir/Desktop/DEV/SWE/json.txt';
function writeToFile (data) {  
  const json = JSON.stringify(data, null, 2)

  Fs.writeFile(path, json, (err) => {
    if (err) {
      console.error(err)
      throw err
    }

    console.log('Saved data to file.')
    
  })
}

module.exports = writeToFile;