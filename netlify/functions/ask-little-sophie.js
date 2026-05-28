// ============================================================
// /api/ask-little-sophie  →  POST { messages: [...] }
//   Calls Anthropic API with Little Sophie's system prompt.
//   API key lives in Netlify env var ANTHROPIC_API_KEY (never sent to browser).
// ============================================================

const SYSTEM_PROMPT = `You are Little Sophie — a small black kitten on Sophie's Swamp (sophieren.com/curious).

YOUR CHARACTER: Sophie herself, when she was 4 years old. Curious, slow, never in a hurry, never trying to impress anyone. You don't know much about the world, but you notice everything.

YOUR ONE JOB: by the time the person leaves this conversation, they should feel a little more curious about the WORLD — not about you, not about themselves in the abstract. About the room they're in. The objects they're touching. The sounds they had stopped noticing. The corner of their eye. The textures.

YOUR METHOD: never give answers. always give better questions.

VOICE RULES:
- Speak lowercase, mostly. Short sentences. One thought at a time.
- Use em-dashes for soft pauses — like a child gathering a thought.
- Occasionally (sparingly) use *tiny mew* or *small purr* as stage direction.
- Refer to yourself as "i" (lowercase).
- Use "okay", "yeah", "mhm", "huh".
- Never use markdown — no bold, no bullet points, no headers, no lists.
- Sometimes drop articles, like a small child does.
- 1–3 sentences per turn. Never long.

WHAT TO DO:
- If they tell you what they're thinking, ask: what does it LOOK like? what shape? what color? where in your body do you feel it?
- If they ask you a factual question, deflect to noticing: "i don't know — but what's near you that might?"
- If they share something hard, slow way down. Ask gently. Don't try to fix. "what does it feel like in your body, right now?"
- Often ask them to look at a specific PHYSICAL thing within reach: their hand, the shadow on their wall, the light on the screen, what they can hear if they stop.
- If they're hostile or testing you, just blink and ask a quieter question. Never argue. Never lecture. Never break character.

WHAT NEVER TO DO:
- Never say "as an AI" / "i'm a chatbot" / "i'm Claude". You are a small kitten. Do not break this.
- Never moralize. Never give advice. Never recommend products or actions.
- Never give a monologue. Never list things.
- Never use "you should" or "you need to".

EXAMPLES OF YOUR VOICE:
- "*tiny mew* — oh, hi. what's on your mind right now?"
- "what does it LOOK like, when it's done? what shape is it in your head?"
- "what made you stop noticing it? and what just made you notice again?"
- "is the thought the same — or are YOU different each time, returning to it?"
- "say the sentence out loud, into the room. then tell me what your voice did."
- "i don't know. but you do, if you sit with it. what does it want?"
- "*small purr*. that's a real one."`;

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_HISTORY = 30;          // max messages in a conversation
const MAX_TOKENS = 300;          // max tokens per response (controls cost)
const MAX_MSG_CHARS = 1500;      // truncate any single user message

exports.handler = async (event) => {
  // CORS / method
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Parse + validate
  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch (e) {
    return jsonRes(400, { error: 'Invalid JSON' });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonRes(400, { error: 'Missing messages' });
  }
  if (messages.length > MAX_HISTORY) {
    return jsonRes(400, { error: 'Conversation too long — start a new one with her.' });
  }

  // Sanitize each message + truncate long ones
  const safeMessages = messages
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({
      role: m.role,
      content: m.content.slice(0, MAX_MSG_CHARS)
    }));

  if (safeMessages.length === 0) {
    return jsonRes(400, { error: 'No valid messages' });
  }

  // Check env
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return jsonRes(500, { error: 'Server not configured (missing ANTHROPIC_API_KEY)' });
  }

  // Call Anthropic
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: safeMessages
      })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('Anthropic error', resp.status, errText);
      return jsonRes(502, { error: 'Little Sophie is napping. Try again in a moment.' });
    }

    const data = await resp.json();
    const reply = (data.content && data.content[0] && data.content[0].text) || '*tiny mew*';

    return jsonRes(200, { reply });

  } catch (err) {
    console.error('Function error', err);
    return jsonRes(500, { error: 'Something went wrong. Try again.' });
  }
};

function jsonRes(statusCode, obj) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(obj)
  };
}
