import React, { useReducer, useState } from 'react';
import styles from './catalog.module.css';
import ProductCard from './productCard';
import { Country, initialCountries } from '@/components/countriylist';
import ImageComp from './productCard/imageComp';
import TextComp from './productCard/textComp';

type State = {
  countries: Country[];
  sortOrder: string;
  countryCount: number;
};

type Action =
  | { type: 'likeAction'; payload: { id: string } }
  | { type: 'deleteCountry'; payload: { id: string } }
  | { type: 'restoreCountry'; payload: { id: string } }
  | { type: 'addCountry'; payload: { country: Country } }
  | { type: 'sortCountries'; payload: { order: string } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'likeAction': 
      { const updatedCountries = state.countries.map((country) =>
        country.id === action.payload.id
          ? { ...country, likecount: country.likecount + 1 }
          : country
      );
      return {
        ...state,
        countries: state.sortOrder
          ? sortCountries(updatedCountries, state.sortOrder)
          : updatedCountries,
      }; }

      case 'deleteCountry': {
        
        const countriesWithDeletion = state.countries.map((country) =>
          country.id === action.payload.id
            ? { ...country, isDeleted: true, likecount: 0 }
            : country
        );
      
        
        const activeCountries = countriesWithDeletion.filter((country) => !country.isDeleted);
        const deletedCountries = countriesWithDeletion.filter((country) => country.isDeleted);
      
        return {
          ...state,
          countries: [...activeCountries, ...deletedCountries],  
        };
      }
      
      
      

      case 'restoreCountry': {
  const restoredCountries = state.countries.map((country) =>
    country.id === action.payload.id ? { ...country, isDeleted: false } : country
  );

  
  const sortedCountries = state.sortOrder
    ? sortCountries(restoredCountries, state.sortOrder)
    : restoredCountries;

  return {
    ...state,
    countries: sortedCountries,
  };
}


case 'addCountry': {
  const updatedCountries = [...state.countries, action.payload.country];

  
  const sortedCountries = state.sortOrder
    ? sortCountries(updatedCountries, state.sortOrder)
    : updatedCountries;

  return {
    ...state,
    countries: sortedCountries,  
    countryCount: state.countryCount + 1,
  };
}

    
      
      

case 'sortCountries': {
  
  const sortedCountries = sortCountries(state.countries, action.payload.order);

  return {
    ...state,
    sortOrder: action.payload.order,
    countries: sortedCountries,
  };
}

  
      

    default:
      return state;
  }
};

const sortCountries = (countries: Country[], order: string) => {
  const activeCountries = countries.filter((country) => !country.isDeleted); 
  const deletedCountries = countries.filter((country) => country.isDeleted);  

  
  if (order === 'asc') {
    activeCountries.sort((a, b) => a.likecount - b.likecount);
  } else if (order === 'desc') {
    activeCountries.sort((a, b) => b.likecount - a.likecount);
  }


  return [...activeCountries, ...deletedCountries];
};






const Catalog: React.FC = () => {
  const initialState: State = {
    countries: initialCountries,
    sortOrder: '',
    countryCount: initialCountries.length,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [formState, setFormState] = useState({ name: '', population: '', capitalCity: '', imageUrl: '' });

  const handleClick = (id: string) => {
    dispatch({ type: 'likeAction', payload: { id } });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    dispatch({ type: 'sortCountries', payload: { order: selectedSort } });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'deleteCountry', payload: { id } });
  };

  const handleRestore = (id: string) => {
    dispatch({ type: 'restoreCountry', payload: { id } });
  };

  const handleAddCountry = () => {
    const newId = (state.countryCount + 1).toString();
    const newCountry: Country = {
      id: newId,
      name: formState.name,
      population: parseInt(formState.population),
      capitalCity: formState.capitalCity,
      imageUrl: formState.imageUrl,
      likecount: 0,
      text: '',
      isDeleted: false,
    };

    dispatch({ type: 'addCountry', payload: { country: newCountry } });
    setFormState({ name: '', population: '', capitalCity: '', imageUrl: '' });
  };

  return (
    <>
      <h1 className={styles.catalog}>Services</h1>

      <div className={styles.sortDropdown}>
        <label htmlFor="sort">Sort by Likes:</label>
        <select id="sort" value={state.sortOrder} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <form className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Population"
          value={formState.population}
          onChange={(e) => setFormState({ ...formState, population: e.target.value })}
        />
        <input
          type="text"
          placeholder="Capital City"
          value={formState.capitalCity}
          onChange={(e) => setFormState({ ...formState, capitalCity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formState.imageUrl}
          onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
        />
        <button type="button" onClick={handleAddCountry}>
          Add Country
        </button>
      </form>

      <div className={styles.catalogContent}>
  {state.countries.map((country, index) => (
    <ProductCard
      key={index}
      id={country.id}
      style={{ opacity: country.isDeleted ? 0.5 : 1 }}
    >
      <ImageComp src={country.imageUrl} alt={`Flag of ${country.name}`} />
      <TextComp
        name={country.name}
        population={country.population}
        capitalCity={country.capitalCity}
      />
      <div className={styles.bottom}>
        {!country.isDeleted && (
          <>
            <button onClick={() => handleClick(country.id)}>
              Like {country.likecount}
            </button>
            <button onClick={() => handleDelete(country.id)}>Delete</button>
          </>
        )}
        {country.isDeleted && (
          <button onClick={() => handleRestore(country.id)}>Restore</button>
        )}
      </div>
    </ProductCard>
  ))}
</div>

    </>
  );
};

export default Catalog;
