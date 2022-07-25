const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const Student = require("../Models/Student.model");
const { authSchema } = require("../helpers/validation_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");
module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const doesExists = await Student.findOne({ email: result.email });
      if (doesExists) {
        throw createError.Conflict(`${req.body.email} is alredy registered!`);
      }
      const student = new Student(result);
      const savedStudent = await student.save();
      res.send(savedStudent);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const user = await Student.findOne({ email: result.email });
      if (!user) throw createError.NotFound("User not found");
      const isPasswordMatched = await user.isValidPassword(result.password);
      if (!isPasswordMatched)
        throw createError.Unauthorized("username/password not matched");
      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);
      res.send({ accessToken, refreshToken });
    } catch (error) {
      if (error.isJoi === true)
        return next(createHttpError.BadRequest("Invalid username/password"));
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await verifyRefreshToken(userId);
      res.send({ accessToken: accessToken, refreshToken: refToken });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    res.send("Logout Route");
    // const myToken = jwt.sign({ id: '12345677', username: 'emailtest@uu.com' },
    //'mysecretjsonwebtoken', { expiresIn: 60, audience: '12345677' })
  },
};
