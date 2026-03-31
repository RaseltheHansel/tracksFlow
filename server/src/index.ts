import express from "express";  
import { createServer } from "http";    
import dotenv from "dotenv";    
import path from "path";
import { sequelize } from "./config/db";
import { initSocket } from "./config/socket";
import { dashboardCors, collectCors } from "./middleware/cors"; 
import { apiLimiter, authLimiter, collectLimiter } from "./middleware/rateLimit";
import authRoutes from "./routes/authRoutes";
import siteRoutes from "./routes/siteRoutes";
import analyticsRoutes from "./routes/analyticsRoutes"; 
import collectRoutes from "./routes/collectRoutes";
import aiRoutes from "./routes/aiRoutes";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// must be done before routes so getIO() works in controllers
initSocket(httpServer);

app.use(express.json());
app.set('trust proxy', 1);

// Website owners load it via script tag in their HTML
app.use(express.static(path.join(__dirname, 'public')));

// Collect routes open in CORS 
app.use('/api/auth', dashboardCors, authRoutes);
app.use('/api/auth', authLimiter);
app.use('/api/sites', apiLimiter, dashboardCors, siteRoutes);
app.use('/api/analytics', apiLimiter, dashboardCors, analyticsRoutes);
app.use('/api/ai', apiLimiter, dashboardCors, aiRoutes);
app.use('/api/collect', collectLimiter, collectRoutes);

// railway sends SIGTERM when stopping the container
process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received, shutting down...');
    await sequelize.close();
    process.exit(0);

});

const PORT = parseInt(process.env.PORT || '5000');

sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database synced!');
    httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`📊 TrackFlow running on port ${PORT}`);
  });

}).catch((err) => {
    console.error('❌ Database sync failed:', err);
    process.exit(1);
});
