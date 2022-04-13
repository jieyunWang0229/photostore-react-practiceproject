import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import classes from "./MainHead.module.css";
import logo from "../../assets/logo/signature.png";
import HeadCartButton from "./HeadCartButton";
import uiSlice from "../store/ui-slice";
import authSlice from "../store/auth-slice";
import DropdownMenu from "./DropdownMenu";
import { BsFillEmojiSmileFill } from "react-icons/bs";


const MainHeader = (props) => {
    const [showDropdownMenu, setShowDropdownMenu] = useState(false);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const showsSignFormHandler = ()=>{
        return dispatch(uiSlice.actions.toggleLogForm());
    };
    const showDropdownMenHandler =()=>{
        return setShowDropdownMenu(true);
    }
    const closeDropdownMenHandler=()=>{
        return setShowDropdownMenu(false);
    }

    const mouseOverHandler = ()=>{
        return console.log("on");
    }
   
    
    return(
    <Fragment>
        <header className={classes.header}>
            <div className={classes.logo}>
                <img src={logo} alt="logo"/>
            </div>
            <div className={classes.navmenu}>
                <ul>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/products'>Photos</NavLink>
                    </li>
                    <li>
                        <NavLink to='/contactme'>Contact</NavLink>
                    </li>
                
                </ul>
            </div>
        
           
           

             {!isLoggedIn && 
                    <div className={classes.btn}>
                        <button className={classes.signbtn} onClick={showsSignFormHandler} >Sign Up / Log In</button>
                    </div>
             }
            
            {isLoggedIn &&  
                <div className={classes.btn2}>
                        <div className={classes.cartbtn}>
                            <HeadCartButton  />
                        </div> 

                        <div className={classes.profileicon}>
                            <BsFillEmojiSmileFill   onMouseEnter={showDropdownMenHandler} onMouseOver={showDropdownMenHandler} />
                        </div> 
                </div>      
            }

            {
                showDropdownMenu &&
                <div className={classes.dropmenu} onMouseLeave={closeDropdownMenHandler} >
                        <DropdownMenu/>
                </div>
            }

        </header>

        <div className={classes.mobliemenu}>
             <NavLink to='/'>Home</NavLink>
             <NavLink to='/products'>Photos</NavLink>
             <NavLink to='/contactme'>Contact</NavLink>
        </div>
    </Fragment>

    )

}

export default MainHeader;
