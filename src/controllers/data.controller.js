const catchAsync = require("../helpers/catchAsync");
const { dataService } = require("../services");
const pick = require("../helpers/pick");


const list = catchAsync(async function (req, res) {
  const filter = { user: req.user, isDeleted: false };
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const { datasets, page } = await dataService.fetchData(filter, options);
  const count = await dataService.count(filter);
  res.status(200).send({
    status: "success",
    message: "Datasets Fetched successfully",
    data: {
      count,
      currentPage: page,
      datasets,
    },
  });
});



module.exports = {
  list
};
