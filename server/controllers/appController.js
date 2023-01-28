import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import otpGenerator from "generate-otp";

/** Middleware */

export const verifyUser = async (req, res, next) => {
  const { username } = req.method === "GET" ? req.query : req.body;
  try {
    let userExist = await UserModel.findOne({ username });
    if (!userExist) {
      return res.status(404).send("User do not exist");
    }
    next();
  } catch (error) {
    return res.status(400).json("Error in authenticate");
  }
};

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export const register = async (req, res) => {
  try {
    const { username, password, email, profile } = req.body;
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique unsername" });
        resolve();
      });
    });

    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, (err, email) => {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique email" });
        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                email,
                profile: profile || "",
                password: hashedPassword,
              });
              user
                .save()
                .then((result) =>
                  res.status(200).send("User Registered successfully")
                )
                .catch((error) => {
                  res.status(400).send(error);
                });
            })
            .catch(() => {
              return res.status(400).send({
                error: "Unable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(404).send({ error });
      });
  } catch (error) {
    return res.status(500).json("Error in register");
  }
};

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send("Password Unavaible");
            }
            //jwt token
            const token = jwt.sign(
              {
                username: user.username,
                userId: user._id,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).json({
              token,
              username: user.username,
              mgs: "Login Successfull",
            });
          })
          .catch((error) => {
            return res.status(400).json({ error: "Password don't match" });
          });
      })
      .catch((error) => {
        return res.status(404).send(error);
      });
  } catch (error) {
    return res.status(500).send("Error in login");
  }
};


/** GET: http://localhost:8080/api/user/example123 */
export const getUser = async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(200).send({ error: "Invalid Username" });
  }
  try {
    UserModel.findOne({ username }, (err, user) => {
      if (err) return res.status(501).send({ error: err });
      if (!user) return res.status(501).send({ error: "User Doesn't exist" });
      const { password, ...rest } = Object.assign({}, user.toJSON());
      return res.status(200).send(rest);
    });
  } catch (error) {
    return res.status(400).send("Error in user");
  }
};

/** GET: http://localhost:8080/api/generateOTP */
export const generateOTP = async (req, res) => {
  try {
    req.app.locals.OTP = await otpGenerator.generate(6, {
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });
    return res.status(201).send(req.app.locals.OTP);
  } catch (error) {
    return res.status(400).json("generateOTP");
  }
};

/** GET: http://localhost:8080/api/verifyOTP */
export const verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(200).send("Invalid OTP");
  }
  try {
    if (parseInt(code) === parseInt(req.app.locals.OTP)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(200).send("Verified OTP successfully");
    } else {
      return res.status(200).send("Invalid OTP");
    }
  } catch (error) {
    return res.status(400).json("verifyOTP");
  }
};

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export const createResetSession = async (req, res) => {
  try {
    if (req.app.locals.resetSession) {
      req.app.locals.resetSession = false;
      return res.status(200).send("Access Granted");
    } else {
      return res.status(440).send("Access denied");
    }
  } catch (error) {
    return res.status(400).send("Access denied");
  }
};

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export const updateUser = async (req, res) => {
  const { userId } = req.user;
  try {
    if (userId) {
      const body = req.body;
      UserModel.updateOne({ _id: userId }, body, (err, data) => {
        if (err) throw new Error();
        return res.status(200).send("Record Updated");
      });
    } else {
      return res.status(400).send("Invalid request");
    }
  } catch (error) {
    return res.status(400).send(`updateUser error ${error}`);
  }
};

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export const resetPassword = async (req, res) => {
  try {
    const { username, password } = req.body;
    if(!req.app.locals.resetSession) return res.status(400).send('Session Expired');
    try {
      UserModel.findOne({ username })
        .then((user) => {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              UserModel.updateOne({ username }, { password: hashedPassword },(err,user)=>{
                if(err)  throw err;
                req.app.locals.resetSession=false;
                return res.status(200).send('Record Updated');
              })
            })
            .catch((err) => {
              return res.status(401).send("Unable to hash password");
            });
        })
        .catch((err) => {
          return res.status(440).status("Username not found");
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  } catch (error) {
    return res.status(400).send(err);
  }
};
