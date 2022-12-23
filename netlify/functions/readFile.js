const fs = require('fs');

export const handler = async () => {

    const data = fs.readFileSync('./netlify/functions/file.txt', 'utf8');

    return {
      statusCode: 200,
      body: JSON.stringify({
        flights: data,
      }),
    }
  }