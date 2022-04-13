import { useReducer } from "react";

const initalState = {
    inputedValue: '',
    isTouchded: false
};

const inputReducer = (state,action) =>{
    if(action.type === 'INPUT'){
        return {
            inputedValue: action.value,
            isTouchded:true
        }
    };
    if(action.type === 'BLUR'){
        return {
            inputedValue: state.inputedValue,
            isTouchded:true
        }
    };
    if(action.type === 'RESET'){
        return {
            inputedValue: '',
            isTouchded:false
        }
    };
    
    return initalState;
    
};


const useInput =(validateValue)=>{
    const [inputState, dispatch]= useReducer(inputReducer,initalState);
    const inputIsValid = validateValue(inputState.inputedValue);
    const inputHasError = !inputIsValid && inputState.isTouchded;

    const inputOnchangeHandler =(event)=>{
        dispatch({type:'INPUT', value:event.target.value});
    };
    const inputBlurHandler = () =>{
        dispatch({type:'BLUR'});
    };
    const inputResetHandler = () =>{
        dispatch({type:'RESET'});
    };
    return {
        value: inputState.inputedValue,
        isValid : inputIsValid,
        inputHasError,
        inputOnchangeHandler,
        inputBlurHandler,
        inputResetHandler
    }

};

export default useInput;