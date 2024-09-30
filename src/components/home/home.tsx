import styles from "./home.module.css";

import { PropsWithChildren } from "react";
const Main:React.FC<PropsWithChildren> = ({children}) =>{

    return(
        <main className={styles.main}>
            {children}            
        </main>
    )
}

export default Main;