const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utils/logger')
dotenv.config();

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        logger.info('MongoDB connected!!');
    } catch (error) {
        logger.error(`Database connection failed: ${error}`);
    }
};

module.exports = ConnectDB;
