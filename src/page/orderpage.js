import { useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./orderpage.module.css";
import Order from "../components/Order/Order";
import { getUserOrder } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";


const Orderpage = ()=>{
 const userid  = useSelector(state => state.auth.uid);
 const { sendRequest, status, error, data }= useHttp(getUserOrder, true);
  useEffect(()=>{
    if(userid){
      sendRequest(userid);
    }
    },[sendRequest,userid]);

    let orders;
    
    if(status === 'completed' && error){
        return(
            <p> {error}</p>
        )
      
    }
    if(status === 'completed' && data.length ===0){
        return(
           < div className={classes.main}>
                <div className={classes.header}>Your order</div>
                 <div className={classes.ordercontainer}>
                    <p> You have no order yet </p>
                </div>
            </div>
          )
         
    }

    if(data){
           orders = data.map((order,index) => {
            const { orderId, product, totalPrice } =order;
            return <Order key={index} orderno ={orderId} totalPrice={totalPrice} product ={product}/>;
        });

    };


   

    return (
       <div className={classes.main}>
           <div className={classes.header}>Your order</div>
           <div className={classes.ordercontainer}>
               {status === 'pending' && <LoadingSpinner/> }
               {orders}
           </div>
       </div>

    )

}

export default Orderpage;
