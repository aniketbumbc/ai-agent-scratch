import { generateImageToolDefinition } from './generationImage'
import { dadJokeToolDefinition } from './joke'
import { redditToolDefinition } from './reddit'

export const tools = [
  generateImageToolDefinition,
  dadJokeToolDefinition,
  redditToolDefinition,
]
