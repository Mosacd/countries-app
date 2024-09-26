import styles from './catalog.module.css';
import ImageComp from './imageComp/imageComp';
import ProductCard from './productCard/productCard';
import TextComp from './textComp/textComp';

const Catalog:React.FC = () =>{

return(
    <>
    <h1 className={styles.catalog}>Catalog</h1>

    <ProductCard>
        <ImageComp/>
        <TextComp/>
    </ProductCard>

    </>
)
}


export default Catalog;