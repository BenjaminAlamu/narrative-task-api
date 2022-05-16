const { Data } = require("../models");


const fetchData = async (criteria = {}, options = {}) => {
  const { sort = { createdAt: -1 }, limit, page } = options;

  const _limit = parseInt(limit, 10);
  const _page = parseInt(page, 10);

  let datasets = await Data.find(criteria)
    .sort(sort)
    .limit(_limit)
    .skip(_limit * (_page - 1));

  return { datasets, page: _page };
};

const count = async (criteria = {}) => {
  return await Data.find(criteria).countDocuments();
};

module.exports = {
  fetchData,
  count,
};
