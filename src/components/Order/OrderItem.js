import classes from "./OrderItem.module.css";

const OrderItem =(props) =>{
    const totalPrice = props.totalPrice.toFixed(2);
    return (
        <li className={classes.orderitem}>
           <div className={classes.iteminfo}>
                <div className={classes.name}>{props.name}</div>
                <div className={classes.amount}>Quantity: {props.quantity} </div> 
                <div className={classes.price}>$ {totalPrice}</div>   
            </div>
        </li>
    )
}

export default OrderItem;