import * as jwt from 'jsonwebtoken';
import * as Bluebird from 'Bluebird';
import { User, AddUserModel, UserModel } from './../models/users';
import { resolve } from 'url';

export module Users {
    export class UserController {
        private saltRounds = 10;
        private jwtSecret = 'supersecure';

        static get userInfo() {
            return ['id', 'username','email', 'dadRating'];
        };

        private static currentUser;
        static get loggedInUser() {
            return UserController.currentUser;
        };

        createUser({username, email, dadRating, pass}: AddUserModel) {
            return User.create({username, email, dadRating, pass: "pass"})
                    .then(user => this.getUser(user!.id));
                }

        logInUser({username, email}: AddUserModel) {
            return User.findOne({ where: { username, email}})
            .then(user => {
                const {id, email} = user!;
                return {token: jwt.sign({ id, email }, this.jwtSecret)}
            });
        }

        getUser(id: number) {
            return User.findById(id, {
                attributes: UserController.userInfo
            }) as Bluebird<UserModel>
        }

        verifyJwt(token: string){
            return new Promise((resolve, reject) => {
                jwt.verify(token, this.jwtSecret, (err, decoded) => {
                    if(err) {
                        return resolve(false);
                    }

                    UserController.currentUser = User.findById(decoded['id']);
                    return resolve(true);
                });
            }) as Promise<boolean>;
        }
    }
}