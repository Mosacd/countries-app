import styles from './textComp.module.css';

const TextComp:React.FC<{name:string, population:number, capitalCity:string}> = ({name,population,capitalCity}) => {


return(
<div className={styles.textContent}>
<h2>{name}</h2>
<h3>{population} Million</h3>
<h4>{capitalCity}</h4>
</div>
)

}

export default TextComp;