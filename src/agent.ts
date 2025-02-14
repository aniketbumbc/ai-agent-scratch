import type { AIMessage } from '../types'
import { getMessages, addMessages, saveToolResponse } from './memory'
import { runLLM } from './llm'
import { logMessage, showLoader } from './ui'
import { runTool } from './toolRunner'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessages([{ role: 'user', content: userMessage }])
  const loader = showLoader('Thinkinggggg')

  while (true) {
    const history = await getMessages()
    const response = await runLLM({ messages: history, tools })
    await addMessages([response])

    if (response.content) {
      loader.stop()
      logMessage(response)
      return getMessages()
    }

    if (response.tool_calls) {
      console.log('  into tool')
      const toolCall = response.tool_calls[0]
      logMessage(response)
      loader.update(`executing tool call ${toolCall.function.name}`)

      const toolResponse = await runTool(toolCall, userMessage)

      await saveToolResponse(toolCall.id, toolResponse)
      loader.update(`tool call done ${toolCall.function.name}`)
    }
  }
}
