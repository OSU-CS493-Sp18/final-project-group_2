"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
exports.userValidation = {
    createUser: [
        check_1.check('email').isEmail().withMessage("Invalid email try again"),
        check_1.check('pass').isLength({ min: 5 }).withMessage("Password too short"),
        check_1.check('username').isString().withMessage("Username invalid"),
        check_1.check('dadRating').isNumeric().withMessage("dad rating must be number")
    ]
};
//# sourceMappingURL=userValidation.js.map