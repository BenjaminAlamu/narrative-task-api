const catchAsync = require("../helpers/catchAsync");
const pick = require("../helpers/pick");

const { authService, tokenService } = require("../services");

const register = catchAsync(async function (req, res) {
  const user = await authService.register(req.body);
  const tokens = await tokenService.generateAuthTokens(user, true);
  res.status(201).send({
    message: "Registration successful",
    data: {
      user,
      token: tokens.access.token,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);

  const token = await tokenService.generateAuthTokens(user);

  res.status(200).send({
    message: "Login successful",
    data: {
      user,
      token: token.access.token,
    },
  });
});


const getUser = catchAsync(async (req, res) => {
  let user;
  if (req.query.user) {
    user = JSON.parse(
      JSON.stringify(await authService.getUserById(req.query.user))
    );
  } else {
    user = JSON.parse(
      JSON.stringify(await authService.getUserById(req.user._id))
    );
  }

  res.status(200).send({
    message: "User details fetched successfully",
    data: {
      user,
    },
  });
});


const getUsers = catchAsync(async function (req, res) {
  const filter = pick(req.query, ["type"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const { users, page } = await authService.fetchUsers(
    JSON.parse(JSON.stringify(filter)),
    options
  );
  const count = await authService.count(filter);
  res.status(200).send({
    status: "success",
    message: "Users Fetched successfully",
    data: {
      count,
      currentPage: page,
      users,
    },
  });
});

module.exports = {
  register,
  login,
  getUser,
  getUsers,
};
