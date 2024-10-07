import React from "react"
import { useParams } from "react-router-dom"
import { countries } from "../countriylist"; 
import styles from './individualCardPage.module.css';

const CardPage:React.FC = () => {

     const {id} = useParams();

     const countryInfo = countries.find((country) => country.id == id )
     
     if(!countryInfo){
        return <div style={{marginTop:'140px', fontSize:'2rem'}}>Not Found</div>
     }



    return(
            <div className={styles.cardpagediv}>
                <h1>{countryInfo.name}</h1>
                <p>{countryInfo.text}</p>
                <img src={countryInfo.imageUrl} alt="image" />
            </div>
    )

}



export default CardPage;