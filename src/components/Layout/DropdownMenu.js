import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./DropdownMenu.module.css";
import authSlice from "../store/auth-slice";
import { Link } from "react-router-dom";

const DropdownMenu = (props)=>{
    const navigate = useNavigate();
    const uid = useSelector(state => state.auth.uid);
    const dispatch = useDispatch();
    const logoutHandler =() =>{
           navigate('/');
        return dispatch(authSlice.actions.logout())
    }
    return (
       <div className={classes.dropdownmenu}>
            <div className={classes.dropdownitem}>
                <a>My account</a>
            </div>
            <div className={classes.dropdownitem}>
                 <Link to={`/${uid}/myorder`}>My Order</Link>
            </div>
            <div className={classes.dropdownitem}>
                 <a onClick={logoutHandler}>Log out</a>
            </div>
     </div>
    )

};

export default DropdownMenu;