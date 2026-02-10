import { AppError } from '@/utils/appError';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Config } from '@/types/config.types';
import { Environment, HttpStatus } from '@/types/common.types';
import { Options as RateLimitOptions } from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packageJsonPath = join(__dirname, '../package.json');
const packageJsonData = readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageJsonData) as { version: string };

// Helper to get environment variable with type safety
function getEnvVar(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

function getEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
}

function getEnvEnum<T extends string>(
  key: string, 
  allowedValues: readonly T[], 
  defaultValue: T
): T {
  const value = process.env[key] as T;
  return allowedValues.includes(value) ? value : defaultValue;
}

const PORT = getEnvNumber('PORT', 4040);
const NODE_ENV = getEnvEnum(
  'NODE_ENV',
  [Environment.DEVELOPMENT, Environment.PRODUCTION, Environment.TEST] as const,
  Environment.PRODUCTION
);

// Rate limit handler factory
function createRateLimitHandler(message: string): RateLimitOptions['handler'] {
  return (_req, _res, _next, _options) => {
    throw new AppError({
      message,
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
    });
  };
}

// ====== Configuration Object ======
export const config: Readonly<Config> = Object.freeze({
  // App Config
  MONGO_URI: getEnvVar('MONGO_URI', 'mongodb://localhost:27017/boiler'),
  PORT,
  NODE_ENV,
  APP_URL: getEnvVar('APP_URL', `http://localhost:${PORT}`),
  APP_NAME: getEnvVar('APP_NAME', 'boiler'),
  VERSION: packageJson.version,

  // JWT Config
  JWT_SECRET: getEnvVar('JWT_SECRET', 'your-super-secret-jwt-key-change-in-production'),
  JWT_EXPIRY: getEnvVar('JWT_EXPIRY', '1d'),
  JWT_REFRESH_SECRET: getEnvVar('JWT_REFRESH_SECRET', 'your-super-secret-refresh-key-change-in-production'),
  JWT_REFRESH_EXPIRY: getEnvVar('JWT_REFRESH_EXPIRY', '7d'),

  // CORS Config
  ALLOWED_ORIGINS: Object.freeze(
    process.env['ALLOWED_ORIGINS']?.split(',').map(origin => origin.trim()) ?? 
    ['http://localhost:5173', 'http://localhost:3000']
  ),

  // Rate Limiting Config
  GLOBAL_RATE_LIMIT_CONFIG: Object.freeze({
    windowMs: 60 * 1000, // 1 minute
    max: getEnvNumber('GLOBAL_RATE_LIMIT_MAX', 100),
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: () => 'global',
    handler: createRateLimitHandler('Too many requests, please try again later.'),
  } as const),

  PER_IP_RATE_LIMIT_CONFIG: Object.freeze({
    windowMs: 60 * 1000, // 1 minute
    max: getEnvNumber('PER_IP_RATE_LIMIT_MAX', 10),
    standardHeaders: true,
    legacyHeaders: false,
    handler: createRateLimitHandler('Too many requests from this IP, please try again later.'),
  } as const),
});
