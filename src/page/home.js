import { Link } from 'react-router-dom';
import classes from './home.module.css';
import video from '../assets/video.mp4' ;
import PhotoCarousel from '../components/Layout/PhotoCarousel';

const Home = () =>{
    return (
        <section className={classes.main}>
            <div className={classes.home_center}>
                <div className={classes.alignrow}>
                    <div className={classes.videocontainer}>
                        <video className={classes.video} autoPlay loop muted>
                            <source src={video} type="video/mp4"/>
                        </video>
                    </div>
                    <div  className={classes.descriptioncontainer}>
                        <h1>The Photo collect 2022</h1>
                        <p>Ut enim ad minima veniam quis nostrum exercitationem ullam corporis at suscipit laboriosam nisi ut aliquid a commodi consequatur Quis autem.</p>
                    </div>
                </div>

               
                 <div className={classes.photocontainer}> 
                    <div className={classes.link}>
                        < Link to={'/products'}>More photos</Link>
                    </div>
                        <PhotoCarousel/>
                </div>

                <div className={classes.infocontainer}>
                    <div className={classes.info1}>
                        Work
                    </div>
                    <div className={classes.info2}>
                        <div className={classes.title}>Project</div>
                        <div className={classes.content}>
                            <p>Nostrud cillum aliquip qui ipsum  </p>
                            <p>Nostrud cillum aliquip </p>
                            <p>Nostrud cillum aliquip qui ipsum amet nulla</p>
                            <p>Nostrud cillum aliquip qui  </p>
                            <p>Nostrud cillum aliquip qui ipsum amet</p>
                        </div>
                    </div>
                    <div className={classes.info2}>
                    <div className={classes.title}>Photo</div>
                        <div className={classes.content}>
                            <p>Nostrud cillum aliquip </p>
                            <p>Nostrud cillum aliquip qui ipsum amet nulla</p>
                            <p>Nostrud cillum aliquip qui  </p>
                        </div>

                    </div>
                </div>
               

        

               

                
               
            </div>
          
        </section>

    )
}

export default Home;


