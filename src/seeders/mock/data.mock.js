// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const types = ['Device Location', 'Device Behavior', 'ID Mapping']

const genericData = async () => {
  const seedData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 20; i++) {
    const temp = {
      name: faker.lorem.words(3),
      slug: faker.lorem.word(),
      type: faker.random.arrayElement(types),
      description: faker.lorem.paragraphs(),
    };

    seedData.push(temp);
  }

  return seedData;
};

module.exports = {
  genericData,
};
