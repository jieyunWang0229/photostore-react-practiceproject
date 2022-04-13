import { useEffect } from 'react';

import classes from './PhotoList.module.css';
import PhotoItem from './PhotoItem';
import useHttp from '../../hooks/use-http';
import { getAllProducts } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const PhotoList = () =>{

    const{ sendRequest, status, data, error }=useHttp(getAllProducts,true);
    let photoList;

    useEffect(()=>{
        sendRequest();
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
            return (
                <div  key={item.id}>
                    <PhotoItem 
                        key={item.id}
                        id ={item.id}
                        img={item.img}
                        />
                </div>

            )
           
        });

    }
  return (
        <div className={classes.list}>
            {photoList}
        </div>
    )

}

export default PhotoList;



