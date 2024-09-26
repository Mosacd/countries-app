import styles from "./main.module.css";
import Hero from "./hero/hero";
import Catalog from "./catalog/catalog";
const Main:React.FC = () =>{

    return(
        <main className={styles.main}>
            <Hero></Hero>
            <Catalog></Catalog>
        </main>
    )
}

export default Main;