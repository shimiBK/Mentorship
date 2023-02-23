const mongoose = require("mongoose");
const {logger} = require("../utils/logger")

const connectDB =  () => {
    try {
    mongoose.set('strictQuery', true);
      const conn = mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      logger.info("DB Connected Successfully");
    } catch (error) {
      logger.error(error,"Something Went Wrong");
      process.exit();
    }
  };

module.exports = {connectDB};
