import styles from './hero.module.css';

const Hero:React.FC = () =>{


    return(
        <div className={styles.heroDiv}>
              <div>
                <h1>Adventure awaits </h1>
                <p>Craft unforgettable moments in breathtaking destinations across the globe</p>
                <button><span>Pick Your Adventure</span></button>
              </div>
        </div>
    )
}

export default Hero;