const { BuyOrder } = require("../models");
const ApiError = require("../helpers/ApiError");

const createBuyOrder = async (req) => {
  try {
    const buyOrder = await BuyOrder.create({ ...req.body, user: req.user });
    return JSON.parse(JSON.stringify(buyOrder));
  } catch (error) {
    throw new ApiError(error.code || 500, error.message || error);
  }
};

const findOne = async (criteria) => {
  try {
    const buyOrder = await BuyOrder.findOne({ ...criteria });
    return JSON.parse(JSON.stringify(buyOrder));
  } catch (error) {
    throw new ApiError(error.code || 500, error.message || error);
  }
};

const fetchBuyOrder = async (criteria = {}, options = {}) => {
  const { sort = { createdAt: -1 }, limit, page } = options;

  const _limit = parseInt(limit, 10);
  const _page = parseInt(page, 10);

  let buyOrder = await BuyOrder.find(criteria)
    .sort(sort)
    .limit(_limit)
    .populate("user", "name email ")
    .skip(_limit * (_page - 1));

  return { buyOrder, page: _page };
};

const count = async (criteria = {}) => {
  return await BuyOrder.find(criteria).countDocuments();
};

const updateBuyOrder = async (buyOrderId, req) => {
  let buyOrder = await BuyOrder.findById(buyOrderId);
  if (!buyOrder || buyOrder.isDeleted) {
    throw new ApiError(404, "Buy Order not found");
  }

  Object.assign(buyOrder, req.body);
  await bid.save();
  return bid;
};

const deleteBuyOrder = async (buyOrderId) => {
  const buyOrder = await BuyOrder.findById(buyOrderId);
  if (!buyOrder) {
    throw new ApiError(404, "Buy Order not found");
  }

  Object.assign(buyOrder, { isDeleted: true });
  await buyOrder.save();
  return buyOrder;
};

module.exports = {
  createBuyOrder,
  findOne,
  fetchBuyOrder,
  count,
  updateBuyOrder,
  deleteBuyOrder,
};
