const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log error details for debugging
  console.error(" Error occurred:");
  console.error("   URL:", req.originalUrl);
  console.error("   Method:", req.method);
  console.error("   Status:", statusCode);
  console.error("   Message:", err.message);
  console.error("   Stack:", err.stack);
  
  res.status(statusCode);
  res.json({ 
    message: err.message,
    status: statusCode,
    path: req.originalUrl
  });
};

module.exports = { notFound, errorHandler };
