import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './PhotoListByCatagory.module.css';
import PhotoItem from './PhotoItem';
import useHttp from '../../hooks/use-http';
import { getProductsByCatagory } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const PhotoListByCatagory = (props) =>{
    const catagory = props.catagory;
    const{ sendRequest, status, data, error }=useHttp(getProductsByCatagory,true);
    let photoList;

    useEffect(()=>{
        sendRequest(catagory);
    },[sendRequest]);

    if(error){
        photoList =  <p>{error}</p>;
    };

    if(status === 'pending'){
        photoList = <LoadingSpinner/>
    }

    if(status === 'completed' && data.length ===0){
        photoList =  <p>No DATA YET</p>
    };

    if(data){
        photoList = data.map(item =>{
            let price = `$${item.price.toFixed(2)}`;
            return <Link  to= {`/products/${item.id}`} 
                          key = {item.id} className={classes.item} >
                        <img src={item.img} alt={item.name} />
                        <div className={classes.name}>{item.name}</div>
                        <div className={classes.price}>{price}</div>
                   </Link>
        });

    }

    return (
        <main className={classes.content}>
            <div className={classes.title}>{catagory}</div>
            <div className={classes.photos}>
                 {photoList}
            </div>        
        </main>
    )

}

export default PhotoListByCatagory;

