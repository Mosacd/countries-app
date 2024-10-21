import styles from './textComp.module.css';
import { translations } from '@/components/translations';
import { useParams } from 'react-router-dom';

const TextComp:React.FC<{name:string, population:number, capitalCity:string}> = ({name,population,capitalCity}) => {
    
    const { lang } = useParams<{ lang: 'en' | 'ka' }>();  
    const currentLang = lang || 'en';

return(
<div className={styles.textContent}>
<h2>{name}</h2>
<h3>{population} {translations[currentLang].services.card.country.million}</h3>
<h4>{capitalCity}</h4>
</div>
)

}

export default TextComp;