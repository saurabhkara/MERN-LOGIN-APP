import { Router } from "express";
import * as controller from '../controllers/appController.js';
import { registerMail } from "../controllers/mailer.js";
import { Auth, createLocals } from "../middleware/auth.js";
const router = Router();
 


//Post Request 
router.route('/register').post(controller.register)

/** alternative way to create endpoint
router.post('/register',(req, res)=>{
    console.log('This is also works fine')
    res.status(200).json('This is also works fine');
})
 */

router.route('/login').post(controller.verifyUser,controller.login);

router.route('/registermail').post(registerMail)
router.route('/authenticate').post(controller.verifyUser)


//Get Request

router.route(`/user/:username`).get(controller.getUser);

router.route('/generateOTP').get(createLocals,controller.verifyUser,controller.generateOTP);

router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP)

router.route('/createResetSession').get(controller.createResetSession)

//Put Request
router.route('/updateuser').put(Auth,controller.updateUser)

router.route('/resetPassword').put(controller.resetPassword);


export default router;