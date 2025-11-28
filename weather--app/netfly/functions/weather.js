export async function handler(event, context) {
    const city = event.queryStringParameters.city;
    const API_KEY = process.env.WEATHER_API_KEY;

    if (!city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "City is required" })
        };
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
}
