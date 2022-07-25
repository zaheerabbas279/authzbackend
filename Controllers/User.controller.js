const createError = require("http-errors");
const User = require("../Models/User.model");
const multer = require("multer");
const ImageModel = require("../Models/Image.model");

module.exports = {
  addNew: async (req, res, next) => {
    try {
      let _user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email_id: req.body.email_id,
        profile: req.body.profile,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
      });

      const doesExists = await User.findOne({ email_id: _user.email_id });
      if (doesExists) {
        throw createError.Conflict(`${_user.email_id} is alredy registered!`);
      }
      const user = new User(_user);
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (error) {
      next(error);
    }
  },

  updateUser: (req, res, next) => {
    try {
      let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email_id: req.body.email_id,
        profile: req.body.profile,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
      };

      User.findByIdAndUpdate(
        req.params.id,
        { $set: user },
        { new: true },
        (err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            console.log("Error while updating the document!");
          }
        }
      );
    } catch (error) {
      next(error);
    }
  },

  listall: async (req, res, next) => {
    try {
      User.find((err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log("No Student Found");
        }
      });
    } catch (error) {
      next(error);
    }
  },

  findUserById: async (req, res, next) => {
    try {
      User.findById(req.params.id, (err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log("Error while getting the document!");
        }
      });
    } catch (error) {
      next(error);
    }
  },

  uploadImage: async (req, res, next) => {
    console.log("req body--------------", req);
    console.log("req body.file", req.body.file);
    try {
      const newImage = new ImageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/png",
        },
      });
      newImage
        .save()
        .then(() => {
          res.send("Successfully Uploaded!");
        })
        .catch((err) => console.log("errr", err));
    } catch (error) {
      console.log("errrorrr", error);
      next(error);
    }
  },
};
