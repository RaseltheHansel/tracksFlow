import cors from 'cors';

const rawClientUrls = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = rawClientUrls
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const dashboardCors = cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (no Origin header)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export const collectCors = cors({
  origin: '*',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});
