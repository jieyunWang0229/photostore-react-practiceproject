import { Link } from 'react-router-dom';
import classes from './PhotoItem.module.css';


const PhotoItem = (props) =>{
   

    return (
        <Link to={`/products/${props.id}`} className={classes.card}>
                <img src={props.img} alt={props.name} />
        </Link>

    )
}

export default PhotoItem;

//
//<p  className={classes.description}>{props.description}</p>
//<p className={classes.price}>{price}</p>
