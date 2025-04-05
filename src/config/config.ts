import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

export default {
  // General
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  SERVER_URL: `${process.env.BASE_URL}:${process.env.PORT}`,

  // Database
  DB_NAME: process.env.DB_NAME,
  DB_URL: process.env.DB_URL,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
};
