import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import classes from './productsdetailpage.module.css';
import Button from "../components/UI/Button";
import useHttp from "../hooks/use-http";
import { getSingleProduct } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { cartActions } from "../components/store/cart-slice";
import { uiActions } from "../components/store/ui-slice";

const Productsdetail = () =>{
    const params = useParams();
    const { productId } = params;
    const { sendRequest, status, error, data } = useHttp(getSingleProduct, true);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
   

    useEffect(()=>{
        sendRequest(productId);
    },[sendRequest,productId]);

    if(status === 'pending'){
        return <LoadingSpinner/>;
    };

    if(error){
        return <p>{error.message}</p>;
    };

    const photo = data;
    const price = `$${photo.price.toFixed(2)}`

    if (status === 'completed' && !photo) {
        return <p>Not Found</p>;
    };
    
    const addItemToCartHandler=()=>{
        if(isLoggedIn){
            const item = {
                id: photo.id,
                name:photo.name,
                price: photo.price,
                quantity:1
            };
            dispatch(cartActions.addItem(item));
        }else{
            dispatch(uiActions.toggleLogForm());
        }
        
    }

    
    return(
        <section className={classes.container}>
            <div className={classes.picture}>
                <img src={photo.img} alt={photo.name}/>         
            </div>
            <div className={classes.info}>
                <h1>{photo.name}</h1>
                <div className={classes.description}>
                    <p >
                        {photo.description}
                    </p>
                </div>
                <div className={classes.brief}>
                    <p>{photo.brief}</p>
                </div>
               
                <div  className={classes.price}>{price}</div>
                <Button onClick={addItemToCartHandler} >Add to Cart</Button>
            
            </div>
        </section>
    )
}
export default Productsdetail;