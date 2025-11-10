// netlify/functions/optimize-prompt.js
// Serverless function to optimize prompts using Claude API

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { prompt, useCase, aiModel } = JSON.parse(event.body);
    
    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing prompt parameter' })
      };
    }

    // Get API key from environment variable
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Build the optimization request
    const optimizationPrompt = `You are a prompt engineering expert. Optimize this prompt for better AI responses:

Original Prompt: "${prompt}"
${useCase ? `Use Case: ${useCase}` : ''}
${aiModel ? `Target Model: ${aiModel}` : ''}

Provide:
1. An optimized version of the prompt
2. A list of 3-5 specific improvements made
3. 2-3 pro tips for this type of prompt

Format your response as JSON:
{
  "optimized": "the improved prompt",
  "improvements": ["improvement 1", "improvement 2", ...],
  "tips": ["tip 1", "tip 2", ...]
}`;

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: optimizationPrompt
        }]
      })
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      throw new Error(`Claude API error: ${errorText}`);
    }

    const claudeData = await claudeResponse.json();
    const content = claudeData.content[0].text;
    
    // Parse the JSON response from Claude
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Claude');
    }

    const result = JSON.parse(jsonMatch[0]);

    // Return the optimized prompt
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error('Optimization error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to optimize prompt',
        message: error.message 
      })
    };
  }
};
