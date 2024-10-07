import { Link } from 'react-router-dom';
import styles from './productCard.module.css';
import { PropsWithChildren } from 'react';

const ProductCard:React.FC<PropsWithChildren<{id: string}>> = ({children, id}) => {

   

    return(
        <Link to={`/${id}`} className={styles.productCard}>
            {children}
        </Link>
    )
}


export default ProductCard;