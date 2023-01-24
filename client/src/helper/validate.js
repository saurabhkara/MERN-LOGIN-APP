import { toast } from "react-hot-toast"

export async function usernameValidate(values){
    const errors = userNameVerify({},values);
    return errors;
}

function userNameVerify(error={}, values ){
    if(!values.username){
        error.username= toast.error('Username Required ..`!!');
    }else if(values.username.includes(" ")){
        error.username = toast.error(" Invalid Username ...!!");
    }
    return error;
}


function passwordVerify(error={},value){
    const specialPattern = /[!@#$%^&*{|}?~_=+.-]/;
    if(!value.password){
        error.password = toast.error('Password Required ...!!')
    }else if(value.password.includes(' ')){
        error.password = toast.error('Invalid password')
    }else if(value.password.length<4){
        error.password = toast.error('Password must be more than 4 character')
    }else if(!specialPattern.test(value.password)){
        error.password = toast.error("Password should must have special character");
    }
    return error;
}

export function passwordValidate(value){
   let error= passwordVerify({},value);
   return error;
}