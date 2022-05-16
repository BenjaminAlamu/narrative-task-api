// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');
const bcrypt = require("bcryptjs");

const seedUsers = async (password, numOfUsers, emailAddress) => {
  const users = [];
  const hashedPassword = await bcrypt.hash(password, 10);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numOfUsers; i++) {
    let email;
    if (i === 0) {
      email = emailAddress;
    } else {
      email = faker.internet.email();
    }
    const user = {
      password: hashedPassword,
      email,
      name: faker.name.findName(),
    };

    users.push(user);
  }

  return users;
};

const genericUsers = async (password, type, numOfUsers, emailAddress) => {
  // eslint-disable-next-line no-return-await
  return await seedUsers(password, type, numOfUsers, emailAddress);
};

module.exports = {
  genericUsers,
};
