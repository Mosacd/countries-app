import styles from "./home.module.css";

import { lazy } from "react";


const LazyCatalog = lazy(() => import("./catalog/catalog"));
const LazyHero = lazy(() => import("./hero/hero"));

const Main:React.FC = () =>{

    return(
        <main className={styles.main}>
            <LazyHero/>
            <LazyCatalog/>        
        </main>
    )
}

export default Main;