import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
// const baseUrl = `http://localhost:8080/api`;

//Authenticate User
export const getAuthenticate = async (username) => {
  try {
    return await axios.post(`/authenticate`, { username: username });
  } catch (error) {
    return { error: "Username doesn't exist, please try again" };
  }
};

//User Details
export const getUser = async ({ username }) => {
  try {
    const { data , status} = await axios.get(`/user/${username}`);
    return {data,status};
  } catch (error) {
    return { error: "Password doesn't match" };
  }
};

//Register User
export const getRegister = async ({ username, email, password, profile }) => {
  try {
    const { data : {msg} , status } = await axios.post(`/register`, {
      username: username,
      email: email,
      password: password,
      profile: profile,
    });
    if(status ===201){
        await axios.post(`/registermail`,{
            username,
            useremail:email,
            text:"Successfully",
            subject:msg
        })
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({error})
  }
};

//Login function
export async function getLogin({username, password}){
    try {
        if(username){
         const {data} = axios.post(`/login`,{ username, password});
         return Promise.resolve({data});
        }
    } catch (error) {
      return Promise.reject({error}) 
    }
}

//Update User
export const getUpdateUser = async(details)=>{
    try {
       const token = await localStorage.getItem('token');
      const {data} = await axios.put(`/updateuser`,details,{headers:{
        "Authorization": `Bearer ${token}`
       }}) 
       return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({error:"Couldn't update profile..!!"});
    }
}

//Generate OTP

export const getGenerateOTP = async({username})=>{
try {
    const {data :{code}, status} = await axios.get(`/generateotp`,{params:{
        username :username
    }});
    if(status===201){
        const {data:{email}} = await getUser({username});
        let text = `Your password recovery code is ${code}`;
        await axios.post(`/registermail`,{username, useremail:email,text,subject:"Password OTP"});
    }
    return Promise.resolve({code})
} catch (error) {
    return Promise.reject({error:"Unable to generate OTP, try again"})
}
}

//Verify OTP
export const getVerifyOTP = async({code, username})=>{
    try {
        const { data, status} = await axios.get(`/verifyotp`,{params:{ code, username}});
        return {data, status};
    } catch (error) {
        return Promise.reject({error:"OTP doesn't match"})
    }
}


//Reset Password
export const getResetPassword = async({username,password})=>{
    try {
        const {data, status} = await axios.put(`/resetpassword`,{username,password});
        return Promise.resolve({data, status});
    } catch (error) {
        return Promise({error});
    }
}
