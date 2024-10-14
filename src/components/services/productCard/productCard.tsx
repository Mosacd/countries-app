import { Link } from 'react-router-dom';
import styles from './productCard.module.css';
import { PropsWithChildren, CSSProperties } from 'react';

interface ProductCardProps {
  id: string;
  style?: CSSProperties; // Adding optional style prop
}

const ProductCard: React.FC<PropsWithChildren<ProductCardProps>> = ({ children, id, style }) => {
  return (
    <div className={styles.productCard} style={style}>
      {children}
      <Link to={`/services/${id}`}>
        <button className={styles.button}>see more</button>
      </Link>
    </div>
  );
};

export default ProductCard;
