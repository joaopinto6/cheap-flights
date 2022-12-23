const fs = require('fs');

export const handler = async () => {
    
    let date_ob = new Date();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();
    
    content = hours + ":" + minutes
    console.log("content: " + content)
    fs.writeFile('./netlify/functions/file.txt', content, { flag: 'a' }, err => {});
    const data = fs.readFileSync('./netlify/functions/file.txt', 'utf8');
    console.log("data: " + data)
    
    return {
      statusCode: 200,
    }
  }