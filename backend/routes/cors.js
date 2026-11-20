const cors = require("cors");

const allowedOrigins = [
  "https://velourabd.com",
  "https://www.velourabd.com",
  "https://deathstar606.github.io",
  "https://vtest-front.vercel.app",
  "http://localhost:3000",
  "https://securepay.sslcommerz.com",
  "https://veloura-staging.vercel.app",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ""));
}

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      const error = new Error(`Not allowed by CORS: ${origin}`);
      error.status = 403;
      callback(error);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

exports.allowedOrigins = allowedOrigins;
exports.corsOptions = corsOptions;
exports.cors = cors(corsOptions);
exports.corsWithOptions = cors(corsOptions);
