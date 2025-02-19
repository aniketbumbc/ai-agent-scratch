import type OpenAI from 'openia'
import {
  generateImage,
  generateImageToolDefinition,
} from './tools/generationImage'
import { dadJoke, dadJokeToolDefinition } from './tools/joke'
import { reddit, redditToolDefinition } from './tools/reddit'
import { getWeather, getWeatherToolDefinition } from './tools/getWeather'

export const runTool = async (
  toolCall: OpenAI.Chat.CompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      return generateImage(input)

    case dadJokeToolDefinition.name:
      return dadJoke(input)

    case redditToolDefinition.name:
      return reddit(input)
    case getWeatherToolDefinition.name:
      return getWeather(input.toolArgs.city)

    default:
      return `Never run this tool: ${toolCall.function.name} agin, or else!`
  }
}
