import { Link } from 'react-router-dom';
import styles from './productCard.module.css';
import { PropsWithChildren } from 'react';

const ProductCard:React.FC<PropsWithChildren<{id: string}>> = ({children, id}) => {

   

    return(
        <div className={styles.productCard}>
            {children}
            <Link to={`/services/${id}`} >
            <button className={styles.button}>see more</button>
        </Link>
        </div>
    )
}


export default ProductCard;