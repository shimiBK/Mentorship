const app = require("./server/index.js");
const {logger} = require("./utils/logger")



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`SERVER IS RUNNING ON PORT ${PORT}`);
});

