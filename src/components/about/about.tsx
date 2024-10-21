import styles from './about.module.css'
import { translations } from '../translations';
import { useParams } from 'react-router-dom';
const About = () => {

const { lang } = useParams<{ lang: 'en' | 'ka' }>();  
const currentLang = lang || 'en';

    return(
        <div className={styles.aboutdiv}>
            <p>{translations[currentLang].about.text}</p>
        </div>
    )
}

export default About;