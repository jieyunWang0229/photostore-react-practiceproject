import { useState, useEffect} from "react";
import { useDispatch, } from "react-redux";

import classes from "./AuthForm.module.css";
import useInput from "../../hooks/use-input";
import authSlice from "../store/auth-slice";
import Modal from "../UI/Modal";
import Logo from "../../assets/logo/signature.png";
import uiSlice from "../store/ui-slice";
import useHttp from "../../hooks/use-http";
import { authConnect } from "../../lib/api";

const validateEmail = (input) =>{
    return String(input)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const  validatePassword = (input) =>{
    return input.trim().length >5 ;
};

const AuthForm =() =>{
    let formIsValid = false;
    let isLoading = false;
    const [isLogin, setIsLogin] = useState(true);
    const switchAuthModeHandler =()=>{
        return setIsLogin(state => !state);
    };

    const dispatch = useDispatch();
    const closeSignFormHandler =()=>{
        return dispatch(uiSlice.actions.toggleLogForm());
    };

    const { sendRequest, status, data, error } = useHttp(authConnect);
    useEffect(()=>{
        if(error){
            console.log(error);

        }
        if(status === 'completed' && !error){
    
            dispatch(authSlice.actions.login(data));
            closeSignFormHandler();
        }; 
    },[error,data]);

    const {  
        value: inputEmail,
        isValid: emailIsValid,
        inputHasError: inputEmailHasErr,
        inputOnchangeHandler: inputEmailOnChangeHandler,
        inputBlurHandler: inputEmailBlurHandler,
        inputResetHandler: restEmail} 
    = useInput(validateEmail);

    const {  
        value: inputPassword,
        isValid: passwordIsValid,
        inputHasError: inputPasswordHasErr,
        inputOnchangeHandler: inputPasswordOnChangeHandler,
        inputBlurHandler: inputPasswordBlurHandler,
        inputResetHandler: restInputPassword} 
    = useInput(validatePassword);

    if(emailIsValid && passwordIsValid){
        formIsValid = true;
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        if(!formIsValid){
            return;
        }
        const userData = {
            enteredEmail:inputEmail,
            enteredPassword: inputPassword
        };
        
        sendRequest(userData,isLogin);
        
        restEmail();
        restInputPassword();
      
    };

    

    
    
   

    const emailClassName = inputEmailHasErr ? `${classes.control} ${classes.invalid}`: `${classes.control}`;
    const passwordClassName = inputPasswordHasErr ? `${classes.control} ${classes.invalid}`: `${classes.control}`;


    return (
        <Modal className={classes.aumodal} onClick = {closeSignFormHandler}>
            <div className={classes.content}>
                <div className={classes.picture}>
                    <img src={Logo} />
                </div>

             
                
                <form className={classes.form} onSubmit={onSubmitHandler}>
                    <div className={classes.title}>
                        <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
                    </div>
                   
                    <div className={emailClassName}>
                            <label htmlFor='email'>Your Email</label>
                            <input 
                                type='email' 
                                id='email' 
                                value={inputEmail} 
                                onChange={inputEmailOnChangeHandler}
                                onBlur ={inputEmailBlurHandler}/>
                            {inputEmailHasErr && <p>Please enter a valid email.</p>}
                    </div>
                    <div className={passwordClassName}>
                            <label htmlFor='password'>Your Password</label>
                            <input
                                type='password'
                                id='password'
                                value={inputPassword}
                                onChange = {inputPasswordOnChangeHandler}
                                onBlur = {inputPasswordBlurHandler}
                            />
                            {inputPasswordHasErr && <p>Please enter a valid password.</p>}
                            
                    </div>
                    {error && <p className={classes.errmsg}>{error}</p>}
                    <div className={classes.actions}>
                            {(status !== 'pending') && (
                            <button>{isLogin ? 'Login' : 'Create Account'}</button>
                            )}
                            {(status === 'pending') && <p>Sending request...</p>}
                            <button
                            type='button'
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                            >
                            {isLogin ? 'Create new account' : 'Login with existing account'}
                            </button>
                    </div>
                </form>
            </div>
       
      </Modal>

    )
};

export default AuthForm;