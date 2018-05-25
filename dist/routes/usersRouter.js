"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filter_1 = require("express-validator/filter");
const check_1 = require("express-validator/check");
const userValidation_1 = require("../lib/userValidation");
const usersController_1 = require("../controllers/usersController");
exports.userRouter = express_1.Router();
const userController = new usersController_1.Users.UserController();
exports.userRouter.post('/create', userValidation_1.userValidation['createUser'], (req, res) => {
    const err = check_1.validationResult(req);
    if (!err.isEmpty()) {
        return res.status(422).json(err.array());
    }
    const user = filter_1.matchedData(req);
    const currentUser = userController.createUser(user);
    return currentUser.then(usr => res.json(usr));
});
//# sourceMappingURL=usersRouter.js.map