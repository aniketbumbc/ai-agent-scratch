import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })
import { z } from 'zod'

console.log('Into getWeather')

export const getWeatherToolDefinition = {
  name: 'getWeather',
  parameters: z.object({
    city: z.string().describe(`Name of the city to fetch the temperature for`),
  }),
  description: 'Fetches the temperature to help decide what to wear.',
}

type Args = z.infer<typeof getWeatherToolDefinition.parameters>

const API_KEY = process.env.WEATHER_API_KEY
const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}`

export const getWeather = async (city: string): Promise<any> => {
  console.log('into FUnction getwather before try ', city)
  try {
    const url = `${BASE_URL}&q=${city}&aqi=no`
    const res = await fetch(`${url}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    const response = await res.json()
    return JSON.stringify(response)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching weather:', error.message)
    } else {
      console.error('An unknown error occurred:', error)
    }

    return null
  }
}
