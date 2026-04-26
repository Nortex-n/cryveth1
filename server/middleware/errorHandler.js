/**
 * Centralized error handler middleware.
 * Always returns JSON with consistent shape: { error, status }
 */
function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);
  }

  res.status(status).json({ error: message, status });
}

function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found`, status: 404 });
}

module.exports = { errorHandler, notFound };
