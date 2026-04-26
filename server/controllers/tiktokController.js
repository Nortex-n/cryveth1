const fetch = require('node-fetch');

/**
 * POST /api/tiktok
 * Body: { url: string }
 */
async function downloadTikTok(req, res, next) {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL TikTok diperlukan' });
    }

    // Basic URL validation
    if (!url.includes('tiktok.com')) {
      return res.status(400).json({ error: 'URL bukan dari TikTok' });
    }

    const params = new URLSearchParams();
    params.set('url', url.trim());
    params.set('hd', '1');

    const response = await fetch('https://tikwm.com/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'current_language=en',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://tikwm.com/',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      return res.status(502).json({ error: `TikWM API error: ${response.status}` });
    }

    const data = await response.json();

    if (data.code !== 0 || !data.data) {
      return res.status(400).json({
        error: data.msg || 'Video tidak ditemukan. Pastikan link valid dan akun tidak private.',
      });
    }

    const v = data.data;
    res.json({
      title:        v.title              || 'Video TikTok',
      cover:        v.cover              || v.origin_cover || '',
      no_watermark: v.play               || '',
      watermark:    v.wmplay             || '',
      music:        v.music              || '',
      author:       v.author?.nickname   || 'Unknown',
      avatar:       v.author?.avatar     || '',
      likes:        v.digg_count         || 0,
      views:        v.play_count         || 0,
      comments:     v.comment_count      || 0,
      duration:     v.duration           || 0,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { downloadTikTok };
