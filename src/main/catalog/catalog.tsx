import styles from './catalog.module.css';
import ImageComp from './imageComp/imageComp';
import ProductCard from './productCard/productCard';
import TextComp from './textComp/textComp';
const Catalog:React.FC = () =>{
    
   
    interface Country {
        name: string;
        population: string;
        capitalCity: string;
        imageUrl: string;
      }
      
      const countries: Country[] = [
        {
          name: "Argentina",
          population: "46.23 million",
          capitalCity: "Buenos Aires",
          imageUrl: 'src/assets/Argentina Tours-h.jpg',
        },
        {
            name: "Brazil",
            population: "214.3 million",
            capitalCity: "Brasília",
            imageUrl: 'src/assets/marianna-smiley-IA0-dP_hnbI-unsplash.jpg',
          },
        {
          name: "Egypt",
          population: "104.26 million",
          capitalCity: "Cairo",
          imageUrl: "src/assets/kevin-et-laurianne-langlais-Rk8yY0UfPx0-unsplash.jpg"
        }
      ];
    

return(
    <>
    <h1 className={styles.catalog}>Catalog</h1>

    <div className={styles.catalogContent}>
        {countries.map((country, index) => {
            return(
                <ProductCard key={index}>
        <ImageComp src={country.imageUrl} alt={`Flag of ${country.name}`} />
        <TextComp>
                <h2>{country.name}</h2>
                <h3>{country.population}</h3>
                <h4>{country.capitalCity}</h4>
                {/*aq mgoni shvilobilad gadacemas prosta chveulebriv
                 propebad micema da textComp-is sxvanairad dawera jobda,
                  ubralod mravalferovnebistvis shvilobilad gadavcem */}
        </TextComp>
        </ProductCard>)
    })}
    </div>

    </>
)
}


export default Catalog;