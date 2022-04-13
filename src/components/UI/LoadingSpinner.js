import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ()=>{
    return (
        <div className={classes.LoadingSpinner}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
        </div>

    )
}

export default LoadingSpinner;