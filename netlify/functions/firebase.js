import flights from './flights.json' assert {type: 'json'}

export const handler = async () => {

    return {
      statusCode: 200,
      body: JSON.stringify({
        flights
      }),
    }
  }
