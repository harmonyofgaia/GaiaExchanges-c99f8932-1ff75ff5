// Example: OpenAI API integration
export async function generateText(prompt: string) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.text || '';
}
