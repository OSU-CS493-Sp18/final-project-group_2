"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users_1 = require("./../models/users");
var Users;
(function (Users) {
    class UserController {
        constructor() {
            this.saltRounds = 10;
            this.jwtSecret = 'supersecure';
        }
        static get userInfo() {
            return ['id', 'username', 'email', 'dadRating'];
        }
        ;
        static get loggedInUser() {
            return UserController.currentUser;
        }
        ;
        createUser({ username, email, dadRating, pass }) {
            return bcrypt.hash(pass, this.saltRounds)
                .then(hash => {
                return users_1.User.create({ username, email, dadRating, pass: hash })
                    .then(user => this.getUser(user.id));
            });
        }
        logInUser({ username, email }) {
            return users_1.User.findOne({ where: { username, email } })
                .then(user => {
                const { id, email } = user;
                return { token: jwt.sign({ id, email }, this.jwtSecret) };
            });
        }
        getUser(id) {
            return users_1.User.findById(id, {
                attributes: UserController.userInfo
            });
        }
        verifyJwt(token) {
            return new Promise((resolve, reject) => {
                jwt.verify(token, this.jwtSecret, (err, decoded) => {
                    if (err) {
                        return resolve(false);
                    }
                    UserController.currentUser = users_1.User.findById(decoded['id']);
                    return resolve(true);
                });
            });
        }
    }
    Users.UserController = UserController;
})(Users = exports.Users || (exports.Users = {}));
//# sourceMappingURL=usersController.js.map