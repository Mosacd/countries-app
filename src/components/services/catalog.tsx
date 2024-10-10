import styles from './catalog.module.css';
import ImageComp from './productCard/imageComp';
import ProductCard from './productCard';
import TextComp from './productCard/textComp';
import { initialCountries } from '@/components/countriylist';
import { useState } from 'react';
import { Country } from '@/components/countriylist';

const Catalog: React.FC = () => {
    
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [sortOrder, setSortOrder] = useState<string>('');

 
  function handleClick(id: string) {
    
    const updatedCountries = countries.map((country) =>
      country.id === id ? { ...country, likecount: country.likecount + 1 } : country
    );

    if (sortOrder) {
      sortCountries(updatedCountries, sortOrder);
    } else {
      setCountries(updatedCountries); 
    }
  }

 
  function sortCountries(countriesToSort: Country[], order: string) {
    const sortedCountries = [...countriesToSort];
    if (order === 'asc') {
      sortedCountries.sort((a, b) => a.likecount - b.likecount);
    } else if (order === 'desc') {
      sortedCountries.sort((a, b) => b.likecount - a.likecount);
    }
    setCountries(sortedCountries);
  }

 
  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedSort = event.target.value;
    setSortOrder(selectedSort);

    
    sortCountries(countries, selectedSort);
  }

  return (
    <>
      <h1 className={styles.catalog}>Services</h1>

      
      <div className={styles.sortDropdown}>
        <label htmlFor="sort">Sort by Likes:</label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      
      <div className={styles.catalogContent}>
        {countries.map((country, index) => (
          <ProductCard key={index} id={country.id}>
            <ImageComp src={country.imageUrl} alt={`Flag of ${country.name}`} />
            <TextComp
              name={country.name}
              population={country.population}
              capitalCity={country.capitalCity}
            />
            <div className={styles.bottom}>
              <button onClick={() => handleClick(country.id)}>
                Like {country.likecount}
              </button>
            </div>
          </ProductCard>
        ))}
      </div>
    </>
  );
};

export default Catalog;
