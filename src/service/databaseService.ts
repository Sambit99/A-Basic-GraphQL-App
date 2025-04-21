import mongoose from 'mongoose';
import config from '../config/config.js';

export default {
  connect: async () => {
    try {
      await mongoose.connect(config.DB_URL as string);
      return mongoose.connection;
    } catch (error) {
      throw error;
    }
  }
};
