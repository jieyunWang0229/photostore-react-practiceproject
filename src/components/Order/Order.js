import classes from "./Order.module.css";  
import OrderItem from "./OrderItem";

const Order = (props) =>{

    const productData = props.product;
    const prductDataArr = Object.values(productData);
    const totalPrice = props.totalPrice.toFixed(2);
    const orderItems = prductDataArr.map (item => {
        return <OrderItem key={item.id} name={item.name} quantity={item.quantity} totalPrice={item.price}/>
    })

        return(
            <div className={classes.order}>
                <div className={classes.id}>Order#{props.orderno}</div>
                <div className={classes.orderitemsdetail}>
                    <ul className={classes.itemslist} >
                        {orderItems}  
                    </ul>
                    <div className={classes.summary}>
                        <span>Total Price: {totalPrice} AUD</span>
                    </div>
                </div>
            </div>
        )

}

export default Order;