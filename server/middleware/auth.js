import jwt from 'jsonwebtoken';
import ENV from '../config.js';
export const Auth = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(400).send('Authorization failed');
    }
} 

export const createLocals = async (req, res, next)=>{
    try {
        req.app.locals ={
            OTP :null,
            resetSession:false
        }
        next();
    } catch (error) {
        return res.status(400).send('Server error, try again');
    }
}

