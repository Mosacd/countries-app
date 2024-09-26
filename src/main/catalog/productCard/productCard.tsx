import styles from './productCard.module.css';
import { PropsWithChildren } from 'react';

const ProductCard:React.FC<PropsWithChildren> = ({children}) => {

   

    return(
    <div className={styles.productCard}>
            {children}
        </div>
    )
}


export default ProductCard;