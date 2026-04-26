const fetch = require('node-fetch');
const FormData = require('form-data');

/**
 * POST /api/catbox
 * multipart/form-data with field "file"
 */
async function uploadCatbox(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File diperlukan. Pilih file terlebih dahulu.' });
    }

    const MAX_SIZE = 200 * 1024 * 1024; // 200 MB
    if (req.file.size > MAX_SIZE) {
      return res.status(400).json({ error: 'File terlalu besar. Maksimal 200MB.' });
    }

    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const MAX_RETRY = 2;
    let lastError = null;

    for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
      try {
        console.log(`[CATBOX] Attempt ${attempt}, size: ${req.file.size} bytes`);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 55_000);

        let response, text;
        try {
          response = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            headers: form.getHeaders(),
            body: form,
            signal: controller.signal,
          });
          text = (await response.text()).trim();
        } finally {
          clearTimeout(timeout);
        }

        console.log(`[CATBOX] Status: ${response.status}, body: ${text.substring(0, 100)}`);

        if (!response.ok) {
          lastError = `Catbox HTTP ${response.status}`;
          if (attempt < MAX_RETRY) continue;
          return res.status(502).json({ error: lastError });
        }

        if (!text.startsWith('https://files.catbox.moe/')) {
          lastError = 'Upload gagal: ' + (text.substring(0, 200) || 'Response tidak valid');
          if (attempt < MAX_RETRY) continue;
          return res.status(400).json({ error: lastError });
        }

        console.log(`[CATBOX] Success: ${text}`);
        return res.json({ url: text, success: true });
      } catch (err) {
        const isTimeout = err.name === 'AbortError';
        lastError = isTimeout
          ? 'Upload timeout — file terlalu besar atau koneksi lambat'
          : `Server error: ${err.message}`;
        console.error(`[CATBOX] Attempt ${attempt} error:`, err.message);
        if (attempt < MAX_RETRY) continue;
      }
    }

    res.status(500).json({ error: lastError || 'Upload gagal setelah beberapa percobaan' });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadCatbox };
