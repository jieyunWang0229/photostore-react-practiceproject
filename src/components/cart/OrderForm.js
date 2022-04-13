import useInput from "./../../hooks/use-input";
import classes from "./OrderForm.module.css";


const validateNameAndAd = (input) => {
    return input.trim().length >0;
};
const validatePostcode = (input) => {
    return input.trim().length ===4;
};
const validatePhone = (input) => {
    return input.trim().length ===10;
};




const OrderForm = (props) =>{
    let formIsValid = false;
    
   
    const {  
        value: inputName,
        isValid: nameIsValid,
        inputHasError: inputNameHasErr,
        inputOnchangeHandler: inputNameOnChangeHandler,
        inputBlurHandler: inputNameBlurHandler,
        inputResetHandler: resetName } 
    = useInput(validateNameAndAd);
    
    const {  
        value: inputPostcode,
        isValid: postcodeIsValid,
        inputHasError: postcodeHasErr,
        inputOnchangeHandler: inputpostcodeOnChangeHandler,
        inputBlurHandler: inputPostcodeBlurHandler,
        inputResetHandler: resetpostcode } 
    = useInput(validatePostcode);

    const {  
        value: inputAddress,
        isValid: AddressIsValid,
        inputHasError: inputAddressHasErr,
        inputOnchangeHandler: inputAddressOnChangeHandler,
        inputBlurHandler: inputAddressBlurHandler,
        inputResetHandler: resetAddress } 
    = useInput(validateNameAndAd);

    const {
        value: inputPhone,
        isValid: phoneIsValid,
        inputHasError: phoneHasErr,
        inputOnchangeHandler: inputphoneOnChangeHandler,
        inputBlurHandler: inputphoneBlurHandler,
        inputResetHandler: resetphonecode } 
    = useInput(validatePhone);

    if(nameIsValid && postcodeIsValid && AddressIsValid && phoneIsValid){
        formIsValid = true;
        props.buttonIsValid(false);
    }
    if(!formIsValid){
        props.buttonIsValid(true);
    }

    let inputState = "VIC";

    const  inputStateHandler =(event) =>{
        return inputState = event.target.value;
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        if(!formIsValid){
            props.buttonIsValid(true);
            return;
        }
        const userdata = {
            name:inputName,
            state: inputState,
            postcode: inputPostcode,
            address: inputAddress,
            phone: inputPhone,
        };
        props.onSubmit(userdata);
        resetName();
        resetAddress();
        resetpostcode();
        resetphonecode();
    }

    const nameClassName = inputNameHasErr ? `${classes.control} ${classes.invalid}`: `${classes.control}`;
    const postcodeClassName = postcodeHasErr ? `${classes.control} ${classes.invalid}`: `${classes.control}`;
    const addressClassName = inputAddressHasErr ? `${classes.control} ${classes.invalid}`: `${classes.control}`;
    const phoneClassName = phoneHasErr ? `${classes.control} ${classes.invalid}`: `${classes.control}`;

    return(
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={classes.title}>
                <h3>Shipping</h3>
            </div>
            <div className={nameClassName}>
                <label htmlFor="name">Name</label>
                <input 
                    id="name" 
                    type="text"
                    value={inputName}
                    onChange= {inputNameOnChangeHandler}
                    onBlur = {inputNameBlurHandler}></input>
                    {inputNameHasErr && <p>Name should not be empty</p>}
            </div>
           
            <div className={classes.control}>
                    <label htmlFor="state">State</label>
                    <select id="state" onChange={inputStateHandler}  >
                        <option value="VIC" >VIC</option>
                        <option value="NSW">NSW</option>
                        <option value="QSL">QSL</option>
                        <option value="WA">WA</option>
                        <option value="TAS">TAS</option>
                        <option value="SA">SA</option>
                    </select>
            </div>
                
            <div className={postcodeClassName}>
                    <label htmlFor="postcode">Postcode</label>
                    <input 
                        id="postcode" 
                        type="number" 
                        maxLength="4"
                        value={inputPostcode}
                        onChange = {inputpostcodeOnChangeHandler}
                        onBlur = {inputPostcodeBlurHandler}></input>
                        {postcodeHasErr && <p>Postcode should be 4 digital</p>}
             </div>
               
           
            <div className={addressClassName}>
                    <label htmlFor="address">Address</label>
                    <input 
                        id="address" 
                        type="text"
                        value={inputAddress}
                        onChange = {inputAddressOnChangeHandler}
                        onBlur = {inputAddressBlurHandler}></input>
                    {inputAddressHasErr && <p>Address should not be empty</p>}
                </div>

            <div className={phoneClassName}>
                 <label htmlFor="phone">Phone</label>
                 <input 
                    id="phone" 
                    type="number" 
                    maxLength="10"
                    value={inputPhone}
                    onChange={inputphoneOnChangeHandler}
                    onBlur = {inputphoneBlurHandler}></input>
                 {phoneHasErr && <p>Phone number shoudl be 10 digital</p>}
            </div>
            {props.children}

        </form>
        
    )
}

export default OrderForm;