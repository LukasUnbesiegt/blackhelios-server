const { User } = require("../models/users/User");

class UserService {
  constructor() {}

  async register({ username, email, password }) {
    return new Promise((resolve, reject) => {
      let errors = {};
      const user = new User({
        username: username,
        email: email,
        password: password,
        auth_type: "LOCAL"
      });

      user.save((err, userDoc) => {
        if (err) {
          errors.register = "user register error";
          reject({ errors: errors });
        } else {
          userDoc.generateToken((err, user) => {
            if (err) {
              errors.register = "error-generate token";
              reject(errors);
            } else {
              resolve(user.token);
            }
          });
        }
      });
    });
  }

  async fbLogin({ email, name, accessToken }) {
    return new Promise((resolve, reject) => {
      let errors = {};
      User.findOne({ email: email }, (err, user) => {
        if (!user) {
          const user = new User({
            name: name,
            email: email,
            accessToken: accessToken,
            auth_type: "FACEBOOK"
          });

          user.save((err, userDoc) => {
            if (err) {
              errors.fbLogin_err = "error in facebooklogin save";
              reject(errors);
            }

            // res.status(500).json({ success: true })
            userDoc.generateToken((err, user) => {
              if (err) {
                errors.fbLogin_err = "error-generate token";
                reject(errors);
              } else {
                resolve(user.token);
              }
            });
          });
        } else {
          resolve(user.token);
        }
      });
    });
  }
  async login({ email, password }) {
    return new Promise((resolve, reject) => {
      let errors = {};
      User.findOne({ email: email }, (err, user) => {
        if (!user) {
          errors.login_user = "user not found";
          reject({ errors });
        } else {
          user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
              errors.login_notmatch = "wrong password";
              reject({ errors });
            }

            user.generateToken((err, user) => {
              if (err) {
                errors.err = err;
                reject({ errors });
              } else {
                resolve(user.token);
              }
            });
          });
        }
      });
    });
  }

  async logout(user) {
    return new Promise((resolve, reject) => {
      let errors = {};
      User.findOneAndUpdate(
        { _id: user._id },
        { token: "" },
        (err, updateUser) => {
          if (err) {
            errors.logout = "logout error";
            reject({ errors });
          }
          resolve({ success: true });
        }
      );
    });
  }
}

module.exports = new UserService();
