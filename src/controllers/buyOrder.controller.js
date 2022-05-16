const catchAsync = require("../helpers/catchAsync");
const { buyOrderService } = require("../services");
const ApiError = require("../helpers/ApiError");
const pick = require("../helpers/pick");

const createBuyOrder = catchAsync(async function (req, res) {
  const buyOrder = await buyOrderService.createBuyOrder(req);
  res.status(201).send({
    message: "Buy order created successfully",
    data: {
      buyOrder,
    },
  });
});

const edit = catchAsync(async function (req, res) {
  const buyOrder = await buyOrderService.updateBuyOrder(req.params._id, req);

  res.status(200).send({
    message: "Buy Order updated successfully",
    data: {
      buyOrder,
    },
  });
});

const list = catchAsync(async function (req, res) {
  const filter = { user: req.user, isDeleted: false };
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const { buyOrder, page } = await bidService.fetchBuyOrder(filter, options);
  const count = await bidService.count(filter);
  res.status(200).send({
    status: "success",
    message: "Buy Order Fetched successfully",
    data: {
      count,
      currentPage: page,
      buyOrder,
    },
  });
});

const listOne = catchAsync(async function (req, res) {
  const buyOrder = await buyOrderService.findOne({
    _id: req.params._id,
    isDeleted: false,
    user: req.user,
  });
  if (!buyOrder) {
    throw new ApiError(404, "Buy order not found");
  }
  res.status(200).send({
    status: "success",
    message: "Buy order fetched Successfully",
    data: {
      buyOrder,
    },
  });
});

const deleteBuyOrder = catchAsync(async function (req, res) {
  const buyOrder = await buyOrderService.deleteBuyOrder(req.params._id);

  res.status(200).send({
    message: "Buy Order deleted successfully",
    data: {
      buyOrder,
    },
  });
});

module.exports = {
  createBuyOrder,
  edit,
  list,
  deleteBuyOrder,
  listOne,
};
