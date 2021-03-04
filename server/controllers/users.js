import User from '../models/User.js';
import validateRegiserInput from '../../validate/register';
import validateLoginInput from '../../validate/login';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../../config/keys'

export const register = async (req, res) => {
    // Form Validation
    const { errors, isValid } = validateRegiserInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if(user) {
            return res.status(400).json({ email: "Email already exists!"});
        } else {
            const newUser = new User({
                name: req.body.name,
                department: req.body.department,
                email: req.body.email,
                password: req.body.password,
                accessLevel: req.body.accessLevel
            });

            // Make sure to hash password for DB storage
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                });
            });
        }
    });
}