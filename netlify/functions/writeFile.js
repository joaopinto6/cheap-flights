const fs = require('fs');

export const handler = async () => {
    
    let date_ob = new Date();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // prints time in HH:MM format
    console.log(hours + ":" + minutes);
    
    // content = '+1'
    // fs.writeFile('./netlify/functions/file.txt', content, { flag: 'a' }, err => {});
    // const data = fs.readFileSync('./netlify/functions/file.txt', 'utf8');
    // console.log(data)
    
    return {
      statusCode: 200,
    }
  }