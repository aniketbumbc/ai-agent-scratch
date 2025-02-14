import type OpenAI from 'openia'

const getWeather = () => 'hot 20deg'

export const runTool = async (
  toolCall: OpenAI.Chat.CompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case 'get_weather':
      return getWeather(input)
    default:
      throw new Error(`unknown tool:${toolCall.function.name}`)
  }
}
