import pino, { destination, levels, transport } from "pino";
const isProduction = process.env.NODE_ENV === 'production';

const developmentConfig = {
  level: 'debug', // levels to show
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname', // ignore this info
      translateTime: 'HH:MM:ss',
      levelFirst: true // format
    }
  }
}

const productionConfig = {
  level: 'info',
  transport: {
    target: 'pino/file', // save logs in a file that we can recovery later
    options: {
      destination: 'app.log',
      translateTime: 'yyyy-MM-dd-HH:MM:ss-Z',
      levelFirst: true
    }
  }
}

const config = isProduction ? productionConfig : developmentConfig;
const logger = pino(config);

export default logger;