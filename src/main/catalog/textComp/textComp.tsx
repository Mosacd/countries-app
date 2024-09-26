
import styles from './textComp.module.css';

const TextComp:React.FC = () => {

  interface Country {
    name: string;
    population: string;
    capitalCity: string;
  }

const country:Country = {
    name: "Argentina",
    population: "46.23 million",
    capitalCity: "Buenos Aires",
  }

return(
<div className={styles.textContent}>
<h2>{country.name}</h2>
<h3>{country.population}</h3>
<h4>{country.capitalCity}</h4>
</div>
)

}

export default TextComp;