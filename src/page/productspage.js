import { useState} from 'react';
import { Link, Outlet,matchPath} from 'react-router-dom';
import PhotoList from "../components/Photos/PhotoList";

import classes from './productspage.module.css';
import PhotoCarousel from '../components/Layout/PhotoCarousel';

const Products = () =>{
   
    return(
        <section className={classes.main}>
            <div className={classes.nav}>
                <div className={classes.author}>Pan Hanzhengyi</div>
                <div className={classes.project}>
                    <h2>Project</h2>
                    <Link className={classes.link} to='animal' >animal</Link>
                    <Link className={classes.link} to='mac'>mac</Link>
                    <Link className={classes.link} to='friedchicken'>fried chicken</Link>
                </div>
            </div>
            <div className={classes.phototcontent}>
                <PhotoList/> 
            </div>
         
            
        </section>
    )
}
export default Products;