import { useDispatch } from 'react-redux';

import classes from './CartItem.module.css';
import { cartActions } from '../store/cart-slice';



const CartItem =(props) =>{
    const dispatch = useDispatch();
    const price = props.price;
    const pricetofixed = `$${price.toFixed(2)}`;

    const addItemToCartHandler=()=>{
        const item = {
            id: props.id,
            name:props.name,
            price: props.price,
            quantity:1
        };
        dispatch(cartActions.addItem(item));
    };
    const removeItemFromCartHandler =()=>{
        dispatch(cartActions.removeItem(props.id));
    };

   
    return (
        <li className={classes.cartitem}>
           <div className={classes.iteminfo}>
                <h4 className={classes.name}>{props.name}</h4>
                <div className={classes.summary}>
                    <span className={classes.price}>{pricetofixed}</span>
                    <span className={classes.amount}>{props.quantity}</span>
                </div>        
            </div>
            <div className={classes.actions}>
                <button onClick={removeItemFromCartHandler}> - </button>
                <button onClick={addItemToCartHandler}> + </button>
            </div>
        </li>
    )
};

export default CartItem;