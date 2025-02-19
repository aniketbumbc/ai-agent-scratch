import { generateImageToolDefinition } from './generationImage'
import { getWeatherToolDefinition } from './getWeather'
import { dadJokeToolDefinition } from './joke'
import { redditToolDefinition } from './reddit'

export const tools = [
  generateImageToolDefinition,
  dadJokeToolDefinition,
  redditToolDefinition,
  getWeatherToolDefinition,
]
