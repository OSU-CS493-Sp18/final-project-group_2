"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersController_1 = require("./../controllers/usersController");
var userController = new usersController_1.Users.UserController();
function getToken(header) {
    const headerToken = header.authorization;
    if (!headerToken) {
        return header;
    }
    return headerToken.split(' ')[1];
}
exports.checkToken = (() => (req, res, next) => {
    let token = getToken(req.headers) || req.query.token || req.body.token || "";
    let isValidUserPromise = userController.verifyJwt(token);
    isValidUserPromise.then(valid => {
        // If invalid send 403
        if (!valid) {
            return res.status(403)
                .send({ message: 'Invalid user, does not have correct login' });
        }
        // Otherwise valid user & continue
        next();
    });
});
//# sourceMappingURL=tokenController.js.map