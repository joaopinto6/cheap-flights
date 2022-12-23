const fs = require('fs');

export const handler = async () => {

    const old_data = fs.readFileSync('./netlify/functions/file.txt', 'utf8');
    
    var num = Number(old_data)
    num++
    const num_str = num.toString()

    fs.writeFile('./netlify/functions/file.txt', num_str, { flag: 'w+' }, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });

    const data = fs.readFileSync('./netlify/functions/file.txt', 'utf8');

    return {
      statusCode: 200,
      body: JSON.stringify({
        flights: data,
      }),
    }
  }