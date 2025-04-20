export const fetchChatGptResponse = async (plantName: string) => {
  const API_URL = process.env.NEXT_PUBLIC_CHATGPT_API_URL
  const API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              '당신은 식물 전문가입니다. 사용자가 제공한 식물에 대해 간단한 설명을 150자 이내로 제공하세요.',
          },
          {
            role: 'user',
            content: `${plantName} 식물에 대해 간단히 150자 이내로 설명해줘.`,
          },
        ],
        max_tokens: 150,
        stop: ['\n\n'],
      }),
    })

    const data = await response.json()
    return data?.choices?.[0]?.message?.content || '식물 정보를 찾을 수 없습니다.'
  } catch (error) {
    console.error('ChatGPT API 호출 오류:', error)
    return '식물 정보를 가져오는 데 실패했습니다.'
  }
}
