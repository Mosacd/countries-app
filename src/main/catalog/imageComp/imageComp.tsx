import argentinaImage from './Argentina Tours-h.jpg';
import styles from './imageComp.module.css'

const ImageComp:React.FC = () => {

return(
<img className={styles.productImage} src={argentinaImage} alt="Description of the image"></img>
)

}

export default ImageComp;