const fs = require('fs');

export const handler = async () => {
    content = '+1'
    fs.writeFile('./netlify/functions/file.txt', content, { flag: 'a+' }, err => {});
    const data = fs.readFileSync('./netlify/functions/file.txt', 'utf8');
    console.log(data)
    
    return {
      statusCode: 200,
    }
  }