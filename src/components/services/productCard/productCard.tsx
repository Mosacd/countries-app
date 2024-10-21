import { Link, useParams } from 'react-router-dom';
import styles from './productCard.module.css';
import { PropsWithChildren, CSSProperties } from 'react';
import { translations } from '@/components/translations';

interface ProductCardProps {
  id: string;
  style?: CSSProperties; // Adding optional style prop
}

const ProductCard: React.FC<PropsWithChildren<ProductCardProps>> = ({ children, id, style }) => {
  const { lang } = useParams<{ lang: 'en' | 'ka' }>();  
 const currentlang = lang || 'en';
  return (
    <div className={styles.productCard} style={style}>
      {children}
      <Link to={`${id}`}>
        <button className={styles.button}>{translations[currentlang].services.card.seemore}</button>
      </Link>
    </div>
  );
};

export default ProductCard;
