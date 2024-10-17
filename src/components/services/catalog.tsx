import React, { useReducer } from 'react';
import styles from './catalog.module.css';
import ProductCard from './productCard';
import { Country, initialCountries } from '@/components/countriylist';
import ImageComp from './productCard/imageComp';
import TextComp from './productCard/textComp';

type FormState = {
  countryName: string;
  population: string;
  capitalCity: string;
  imageUrl: string;
  errors: {
    countryName: string;
    population: string;
    capitalCity: string;
  };
};

type FormAction =
  | { type: 'SetCountryName'; payload: string }
  | { type: 'SetPopulation'; payload: string }
  | { type: 'SetCapitalCity'; payload: string }
  | { type: 'SetImageUrl'; payload: string }
  | { type: 'ResetForm' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SetCountryName': {
      const error = action.payload.length < 3 ? 'Country name must be at least 3 characters.' : '';
      return { ...state, countryName: action.payload, errors: { ...state.errors, countryName: error } };
    }
    case 'SetPopulation': {
      const error = isNaN(Number(action.payload)) || Number(action.payload) <= 0
        ? 'Population must be a number greater than 0.'
        : '';
      return { ...state, population: action.payload, errors: { ...state.errors, population: error } };
    }
    case 'SetCapitalCity': {
      const error = action.payload.length < 3 ? 'Capital city must be at least 3 characters.' : '';
      return { ...state, capitalCity: action.payload, errors: { ...state.errors, capitalCity: error } };
    }
    case 'SetImageUrl':
      return { ...state, imageUrl: action.payload };
    case 'ResetForm':
      return {
        countryName: '',
        population: '',
        capitalCity: '',
        imageUrl: '',
        errors: { countryName: '', population: '', capitalCity: '' }
      };
    default:
      return state;
  }
};

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
    case 'likeAction': {
      const updatedCountries = state.countries.map((country) =>
        country.id === action.payload.id
          ? { ...country, likecount: country.likecount + 1 }
          : country
      );
      return {
        ...state,
        countries: state.sortOrder
          ? sortCountries(updatedCountries, state.sortOrder)
          : updatedCountries,
      };
    }
    case 'deleteCountry': {
      const countriesWithDeletion = state.countries.map((country) =>
        country.id === action.payload.id
          ? { ...country, isDeleted: true}
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

  const [formState, formDispatch] = useReducer(formReducer, {
    countryName: '',
    population: '',
    capitalCity: '',
    imageUrl: '',
    errors: { countryName: '', population: '', capitalCity: '' },
  });

  const handleAddCountry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1);
    if (!formState.errors.countryName && !formState.errors.population && !formState.errors.capitalCity) {
      const newId = (state.countryCount + 1).toString();
      const newCountry: Country = {
        id: newId,
        name: formState.countryName,
        population: parseInt(formState.population),
        capitalCity: formState.capitalCity,
        imageUrl: formState.imageUrl,
        likecount: 0,
        text: '',
        isDeleted: false,
      };

      dispatch({ type: 'addCountry', payload: { country: newCountry } });
      formDispatch({ type: 'ResetForm' });
    }
  };

  const isFormValid =
    !formState.errors.countryName &&
    !formState.errors.population &&
    !formState.errors.capitalCity &&
    formState.countryName.length > 2 &&
    formState.capitalCity.length > 2 &&
    Number(formState.population) > 0;

  return (
    <>
      <h1 className={styles.catalog}>Services</h1>

      <div className={styles.sortDropdown}>
        <label htmlFor="sort">Sort by Likes:</label>
        <select
          id="sort"
          value={state.sortOrder}
          onChange={(e) => dispatch({ type: 'sortCountries', payload: { order: e.target.value } })}
        >
          <option value="">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <form onSubmit={handleAddCountry} className={styles.form}>
  <input
    type="text"
    placeholder="Name"
    value={formState.countryName}
    onChange={(e) => formDispatch({ type: 'SetCountryName', payload: e.target.value })}
  />
  {formState.errors.countryName && <p className={styles.error}>{formState.errors.countryName}</p>}

  <input
    type="text"
    placeholder="Population"
    value={formState.population}
    onChange={(e) => formDispatch({ type: 'SetPopulation', payload: e.target.value })}
  />
  {formState.errors.population && <p className={styles.error}>{formState.errors.population}</p>}

  <input
    type="text"
    placeholder="Capital City"
    value={formState.capitalCity}
    onChange={(e) => formDispatch({ type: 'SetCapitalCity', payload: e.target.value })}
  />
  {formState.errors.capitalCity && <p className={styles.error}>{formState.errors.capitalCity}</p>}

  <input
    type="text"
    placeholder="Image URL"
    value={formState.imageUrl}
    onChange={(e) => formDispatch({ type: 'SetImageUrl', payload: e.target.value })}
  />

  <button type="submit" disabled={!isFormValid}>
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
                  <button onClick={() => dispatch({ type: 'likeAction', payload: { id: country.id } })}>
                    Like {country.likecount}
                  </button>
                  <button onClick={() => dispatch({ type: 'deleteCountry', payload: { id: country.id } })}>Delete</button>
                </>
              )}
              {country.isDeleted && (
                <button onClick={() => dispatch({ type: 'restoreCountry', payload: { id: country.id } })}>
                  Restore
                </button>
              )}
            </div>
          </ProductCard>
        ))}
      </div>
    </>
  );
};

export default Catalog;
