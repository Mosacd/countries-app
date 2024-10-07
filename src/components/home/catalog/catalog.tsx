import styles from './catalog.module.css';
import ImageComp from './productCard/imageComp';
import ProductCard from './productCard';
import TextComp from './productCard/textComp';
import { countries } from '@/components/countriylist';



const Catalog:React.FC = () =>{
    
return(
    <>
    <h1 className={styles.catalog}>Catalog</h1>

    <div className={styles.catalogContent}>
        {countries.map((country, index) => {
            return(
                <ProductCard key={index} id={countries[index].id}>
                  <ImageComp src={country.imageUrl} alt={`Flag of ${country.name}`} />
                  <TextComp name={country.name} population={country.population} capitalCity={country.capitalCity} />
                </ProductCard>)
            })}
    </div>

    </>
)
}


export default Catalog;