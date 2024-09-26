
import { PropsWithChildren } from 'react';
import styles from './textComp.module.css';

const TextComp:React.FC<PropsWithChildren> = ({children}) => {


return(
<div className={styles.textContent}>
{children}
</div>
)

}

export default TextComp;