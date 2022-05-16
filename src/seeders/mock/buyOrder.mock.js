// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');

const genericBuyOrder = async (users, data) => {
  const seedData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 20; i++) {
    const temp = {
      maxPrice: faker.commerce.price(10000, 20000, 0),
      user: faker.random.arrayElement(users),
      dataId: faker.random.arrayElement(data),
    };

    seedData.push(temp);
  }

  return seedData;
};

module.exports = {
  genericBuyOrder,
};
