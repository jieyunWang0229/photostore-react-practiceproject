import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import uiSlice from '../store/ui-slice';
import cartSlice from '../store/cart-slice';
import OrderForm from './OrderForm';
import useHttp from "../../hooks/use-http";
import { postOrder } from "../../lib/api";
import LoadingSpinner from '../UI/LoadingSpinner';


const Cart = (props) =>{
    const { sendRequest, status, error, }=useHttp(postOrder);
    const [buttonIsDisabled, setButtonIsDisabled]= useState(true);
    const uid = useSelector(state => state.auth.uid);
    const items = useSelector(state => state.cart.items);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const totalPricefixed = `$${totalPrice.toFixed(2)}`;
    const dispatch = useDispatch();
    const toggleHandler = () =>{
        return dispatch(uiSlice.actions.toggleCart());
    }

    let cartItems;
    if(!items || items.length ===0 ){
        cartItems = <p>You have not add any product yet!</p>;
    }
    if(items.length > 0){
        cartItems = (
            <ul className={classes.cartitems}>
                {items.map(item => (
                    <CartItem 
                        key = {item.id}
                        id = {item.id}
                        name = {item.name}
                        price ={item.price}
                        quantity = {item.quantity}
                    />
                ))}
            </ul>
        )
    }
    const submitOrderHandler=(userdata)=>{
        
        const ordderData = {
            orderId: Date.now() ,
            product: items,
            totalPrice,
            shippinginfo:userdata 
        }
        
        sendRequest(ordderData,uid);
        dispatch(cartSlice.actions.clearCart())

    }

    const setButtonHandler=(boolean)=>{
       setButtonIsDisabled(boolean);
    }
     
    let cartContent;

    if(status === 'completed' && !error){
        cartContent = <p className={classes.completed}>Your order is completed!</p>
    }else {
        cartContent = (
            <div className={classes.cartcontent}>
                <div className={classes.cartitemcontainer}>
                    <div className={classes.cartitemlist}>
                            {cartItems}
                    </div>
                
                    <div className={classes.total}>
                            <span>Total Price</span>
                            <span>{totalPricefixed}</span>
                     </div>
                </div>
                
                <div className={classes.shippinginfo} >
                    <OrderForm onSubmit = {submitOrderHandler} buttonIsValid= {setButtonHandler}>
                    {
                        items.length >0 &&
                        <button className={classes.button} disabled={buttonIsDisabled}>Order</button>
                    }
                    </OrderForm>
                </div>

            </div>      
        ) 
    };
    return (
        <Modal className={classes.cartmodal} onClick={toggleHandler}>
            <div className={classes.cartmodalcontent} >
                <div className={classes.btn}>
                    <button className={classes.close} onClick ={toggleHandler}>X</button>
                </div>
                <div className={classes.title}>
                    <h2>Shopping Cart</h2>
                </div>
                {cartContent}
                {status === 'pending' && <LoadingSpinner />}

            </div>
           
        </Modal>

    )
}

export default Cart;
