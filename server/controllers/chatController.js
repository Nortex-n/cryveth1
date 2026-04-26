const { sendToAI } = require('../services/aiService');

/**
 * POST /api/chat
 * Body: { messages: [{role, content}] }
 */
async function chat(req, res, next) {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Field "messages" (array) diperlukan' });
    }

    // Sanitize messages
    const sanitized = messages
      .filter(m => m && typeof m.role === 'string' && typeof m.content === 'string')
      .map(m => ({ role: m.role, content: String(m.content).slice(0, 4000) }))
      .slice(-20); // Keep last 20 messages for context window

    if (sanitized.length === 0) {
      return res.status(400).json({ error: 'Format messages tidak valid' });
    }

    const result = await sendToAI(sanitized);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { chat };
