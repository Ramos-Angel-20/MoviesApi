import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const generateJwt = uid => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_SECRET,  {
            expiresIn: '2h'
        }, (err, token) => {
            
            if (err) {
                console.log(err);
                reject(err.message);
            }

            resolve(token);
        });
    });
}

export default generateJwt;