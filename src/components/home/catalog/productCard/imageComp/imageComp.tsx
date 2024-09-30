import styles from './imageComp.module.css'


interface ImageCompProps {
    src: string;
    alt: string;
  }
  
  const ImageComp: React.FC<ImageCompProps> = ({ src, alt }) => {
   return(<img src={src} alt={alt} className={styles.productImage} />)
  };


export default ImageComp;