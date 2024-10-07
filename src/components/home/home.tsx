import styles from "./home.module.css";
import Hero from "./hero";
import Catalog from "./catalog";

const Main:React.FC = () =>{

    return(
        <main className={styles.main}>
            <Hero/>
            <Catalog/>        
        </main>
    )
}

export default Main;