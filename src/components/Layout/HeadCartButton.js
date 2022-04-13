import { useDispatch,useSelector } from 'react-redux';
import classes from './HeadCartButton.module.css';
import CartIcon from './CartIcon';
import { uiActions } from '../store/ui-slice';

const HeadCartButton = (props) =>{
    const dispatch  = useDispatch();
    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    const toggleHandler = () =>{
        dispatch(uiActions.toggleCart());
    }
    const btnClass = `${classes.button} ${classes.bump}`;

    return(
        <button className={btnClass} onClick={toggleHandler}>
            <span className={classes.icon}><CartIcon/></span>
            <span className={classes.badge}>{totalQuantity}</span>
        </button>

    )
}

export  default HeadCartButton;

