const jwt = require("jsonwebtoken");
const moment = require("moment");

const { Token, User } = require("../models");
const ApiError = require("../helpers/ApiError");
const { userService } = require("./index");

const generateToken = (user, expires) => {
  const payload = {
    sub: user.id,
    user,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  try {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  } catch (error) {
    const message = error.message || error;
    const errCode = error.code || 500;
    throw new ApiError(errCode, message);
  }
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    const err = {
      code: 404,
      message: "Invalid token",
    };
    throw err;
  }
  return tokenDoc;
};

const generateAuthTokens = async (user, newUser = false) => {
  const accessTokenExpires = moment().add(30, "days");
  const accessToken = generateToken(user, accessTokenExpires);

  const emailTokenExpires = moment().add(60, "minutes");

  const returnTokens = {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };

  if (newUser) {
    const emailVerificationToken = generateToken(user, emailTokenExpires);
    await saveToken(
      emailVerificationToken,
      user._id,
      emailTokenExpires,
      "emailToken"
    );
    returnTokens.emailToken = {
      token: emailVerificationToken,
      expires: emailTokenExpires.toDate(),
    };
  }

  return returnTokens;
};

const deleteToken = async (userId, type) => {
  try {
    await Token.findOneAndRemove({
      user: userId,
      type,
    });
  } catch (error) {
    const message = error.message || error;
    const errCode = error.code || httpStatus.INTERNAL_SERVER_ERROR;
    throw new ApiError(errCode, message);
  }
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  deleteToken,
};
