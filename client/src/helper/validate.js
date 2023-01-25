import { toast } from "react-hot-toast"

/*User Name Validation */

export async function usernameValidate(values){
    const errors = userNameVerify({},values);
    return errors;
}

/*Password validation */

export function passwordValidate(value){
   let error= passwordVerify({},value);
   return error;
}

/* validate resting password */

export function resetPasswordValidate(values){
    const error = passwordVerify({},values);
    if(values.password !== values.confirm_pwd){
        error.password = toast.error('Password must be same')
    }
    return error;
}

export  async function registerValidate(values){
    const error = userNameVerify({}, values);
    passwordVerify(error, values);
    emailVerify(error,values);
    return error
}

export async function profileValidate(values){
    const error = firstAndLastVerify({},values,'firstname');
    firstAndLastVerify(error,values,'lastname')
    emailVerify(error,values);
    mobileVerify(error,values);

    return error;
}


//============================================



// Password validation

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

//Username validation

function userNameVerify(error={}, values ){
    if(!values.username){
        error.username= toast.error('Username Required ..`!!');
    }else if(values.username.includes(" ")){
        error.username = toast.error(" Invalid Username ...!!");
    }
    return error;
}

function emailVerify(error={},values){
    if(!values.email){
        error.email = toast.error('Email Required');
    }else if(values.email.includes(' ')){
        error.email = toast.error('Wrong email');
    }else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/.test(values.email)){
        error.email = toast.error('Invalid Email');
    }
    return error;
}

function firstAndLastVerify(error={},values,name){
    if(!values[name]){
        error[name] = toast.error(`${name} is required`);
    }else if(values[name].includes(' ')){
        error[name]= toast.error(`Invalid ${name}`)
    }else if(!/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(values[name])){
        error[name] = toast.error(`Invalid ${name}`)
    }
    return error;
}

function mobileVerify(error={}, values){
    if(!values.mobile){
        error.mobile = toast.error('Mobile Number is required');
    }else if(values.mobile.includes(' ')){
        error.mobile = toast.error('Invalid Mobile Number'); 
    }else if(!/^\d{10}$/.test(values.mobile)){
        error.mobile = toast.error('Mobile number must be 10 digits');
    }
    return error;
}