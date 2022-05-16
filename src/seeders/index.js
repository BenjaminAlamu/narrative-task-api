const mongoose = require("mongoose");
const logger = require("../helpers/logger");
require("dotenv").config();
const { User, Data, BuyOrder } = require("../models");
const { genericUsers } = require("./mock/users.mock");
const { genericData } = require("./mock/data.mock");
const { genericBuyOrder } = require("./mock/buyOrder.mock");

const connectDB = async () => {
  logger.info("connecting to db");

  await mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

const clearDB = async () => {
  logger.warn("clearing db");
  await Promise.all(
    Object.values(mongoose.connection.collections).map(async (collection) =>
      collection.deleteMany()
    )
  );
  await User.deleteMany();
};

const disconnectDB = async () => {
  logger.warn("disconnecting from db");
  await mongoose.disconnect();
};

const seedDB = async () => {
  try {
    logger.info("Seeding Database");
    await connectDB();
    await clearDB();

    logger.info("Creating Random Users");
    const fakeUsers = await User.create(
      await genericUsers("password", 20, "benjamin@narrative.co")
    );

    logger.info("Creating Data Points");
    const fakeData = await Data.create(await genericData());

    logger.info("Creating Buy Orders");
    const fakeBuyOrder = await BuyOrder.create(await genericBuyOrder(fakeUsers, fakeData));

    logger.info("seeder completed");
  } catch (e) {
    logger.error(e);
  }

  await disconnectDB();
};

seedDB();
