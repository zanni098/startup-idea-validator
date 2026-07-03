import Anthropic from '@anthropic-ai/sdk';

export interface Scorecard {
  score: number;
  icp: string;
  critique: string;
  market: string;
  competitors: string[];
  risks: string[];
  experiment: string;
  positioning: string;
}

const SYSTEM_PROMPT = `You are an expert startup validator. Analyze the provided startup idea and return a detailed scorecard in JSON format.

The JSON should have the following structure:
{
  "score": number (0-100),
  "icp": "string description of Ideal Customer Profile",
  "critique": "string of devil's advocate critique",
  "market": "string analysis of market pull",
  "competitors": ["list", "of", "competitors"],
  "risks": ["list", "of", "execution", "risks"],
  "experiment": "string description of the next validation experiment",
  "positioning": "string on how to position the product"
}

Be honest, critical, and helpful.`;

export async function validateIdea(idea: string, apiKey: string): Promise<Scorecard> {
  const anthropic = new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Validate this startup idea: ${idea}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response format from Claude');
  }

  try {
    // Attempt to extract JSON if it's wrapped in markers or extra text
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : content.text;
    return JSON.parse(jsonString) as Scorecard;
  } catch (e) {
    console.error('Failed to parse Claude response:', content.text);
    throw new Error('Failed to parse validation results');
  }
}
