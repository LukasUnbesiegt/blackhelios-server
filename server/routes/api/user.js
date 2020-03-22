const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const { User } = require("../../models/users/User");
const { alreadyEmailValidation } = require("../../validations/users");
const UserCtrl = require("../../controllers/UserCtrl");
const { authMiddleware } = require("../../middleware/auth");

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .custom((value, { req }) => {
        return alreadyEmailValidation(value);
      }),
    body("password").isLength({ min: 5 })
  ],
  UserCtrl.register
);
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  UserCtrl.login
);
router.post("/fblogin", UserCtrl.fbLogin);
router.get("/auth", authMiddleware, UserCtrl.auth);
router.get("/logout", authMiddleware, UserCtrl.logout);

module.exports = router;
