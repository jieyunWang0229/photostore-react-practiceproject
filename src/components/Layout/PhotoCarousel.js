import { useEffect,useRef,useState } from 'react';
import { motion,useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useHttp from '../../hooks/use-http';
import {  getAllProducts } from '../../lib/api';

import classes from './PhotoCarousel.module.css';


const PhotoCarousel = () => {
    const{ sendRequest, data, }=useHttp(getAllProducts,true);
    const [ischanged,setIsChanged]= useState();
    const slidecontainerRef = useRef();
    const animation1 = useAnimation();
    const animation2 = useAnimation();
    const { ref:ref1, inView:inView1, } = useInView({root:slidecontainerRef.current},0.5);
    const { ref:ref2, inView:inView2, } = useInView({root:slidecontainerRef.current},0.5);

    useEffect(()=>{
        sendRequest();
    },[sendRequest]);

    let imgs ;

    if(data){
        imgs = data.map((item,index)=>{
            if(index === 0 ){
               return <img ref={ref1}  key={item.id} src={item.img} alt={item.name}></img>;
            }else if( index === data.length-1){
                return <img ref={ref2}  key={item.id} src={item.img} alt={item.name}></img>
            };
            return <img key={item.id} src={item.img} alt={item.name}></img>
           
        });
    }

    useEffect(()=>{
        console.log(1)
       if(inView1){
           animation1.start(
               {
                    x:'+100',
                    opacity:0,
                    transition:{
                        type:'spring', bounce:0.2
                    }
               }
           );
       }
       if(inView2){
        animation2.start(
            {
                 x:'-100vw',
                 opacity:0,
                 transition:{
                     type:'spring', bounce:0.2
                 }
            }
        );

       }

       setIsChanged(true);
       if(ischanged && !inView1 ){
        animation1.start(
            {
                 x:0,
                 opacity:100,
                 transition:{
                     type:'spring', bounce:0.2
                 }
            }
        );
       }
       if(ischanged && !inView2){
        animation2.start(
            {
                 x:0,
                 opacity:100,
                 transition:{
                     type:'spring', bounce:0.2
                 }
            }
        );
       }
    },[inView1,inView2,ischanged])

    
    const slideLeftHandler = ()=>{
        console.log(2);
        slidecontainerRef.current.scrollLeft =  slidecontainerRef.current.scrollLeft+ 330;
    }
    const slideRightHandler = ()=>{
        slidecontainerRef.current.scrollLeft =  slidecontainerRef.current.scrollLeft- 330;
    }

    return(
        <div className={classes.slidecontainer} >
            <motion.div className={classes.buttonleft} animate={animation2} >
                <MdKeyboardArrowLeft className={`${classes.icon} `} onClick={slideLeftHandler} /> 
            </motion.div>
            
            <div className={classes.piccontainer} ref={slidecontainerRef}>
                {imgs}
            </div>
            <motion.div animate={animation1} className={classes.buttonright} >
                <MdKeyboardArrowRight className={`${classes.icon} ` } onClick={slideRightHandler}/>
            </motion.div>
           
         </div>
    )
    

}

export default PhotoCarousel;