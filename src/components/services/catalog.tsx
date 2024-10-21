import React, { useReducer } from 'react';
import styles from './catalog.module.css';
import ProductCard from './productCard';
import { Country, initialCountries } from '@/components/countriylist';
import ImageComp from './productCard/imageComp';
import TextComp from './productCard/textComp';
import { useParams } from 'react-router-dom';
import { translations } from '../translations';


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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { lang } = useParams<{ lang: 'en' | 'ka' }>();  
  const currentLang = lang || 'en';

  switch (action.type) {
    case 'SetCountryName': {
      const error = action.payload.length < 3 ? translations[currentLang].services.from.errors.nameerr : '';
      return { ...state, countryName: action.payload, errors: { ...state.errors, countryName: error } };
    }
    case 'SetPopulation': {
      const error = isNaN(Number(action.payload)) || Number(action.payload) <= 0
        ? translations[currentLang].services.from.errors.populationerr
        : '';
      return { ...state, population: action.payload, errors: { ...state.errors, population: error } };
    }
    case 'SetCapitalCity': {
      const error = action.payload.length < 3 ? translations[currentLang].services.from.errors.capitalcityerr : '';
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

  const { lang } = useParams<{ lang: 'en' | 'ka' }>();  
  const currentLang = lang || 'en';
  
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
        nameEn: formState.countryName,
        nameKa: '',
        population: parseInt(formState.population),
        capitalCityEn: formState.capitalCity,
        capitalCityKa: '',
        imageUrl: formState.imageUrl,
        likecount: 0,
        textEn: '',
        textKa: '',
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
      <h1 className={styles.catalog}>{translations[currentLang].services.title}</h1>

      <div className={styles.sortDropdown}>
        <label htmlFor="sort">{translations[currentLang].services.sort.text}</label>
        <select
          id="sort"
          value={state.sortOrder}
          onChange={(e) => dispatch({ type: 'sortCountries', payload: { order: e.target.value } })}
        >
          <option value="">{translations[currentLang].services.sort.select}</option>
          <option value="asc">{translations[currentLang].services.sort.asc}</option>
          <option value="desc">{translations[currentLang].services.sort.desc}</option>
        </select>
      </div>

      <form onSubmit={handleAddCountry} className={styles.form}>
  <input
    type="text"
    placeholder={translations[currentLang].services.from.name}
    value={formState.countryName}
    onChange={(e) => formDispatch({ type: 'SetCountryName', payload: e.target.value })}
  />
  {formState.errors.countryName && <p className={styles.error}>{formState.errors.countryName}</p>}

  <input
    type="text"
    placeholder={translations[currentLang].services.from.population}
    value={formState.population}
    onChange={(e) => formDispatch({ type: 'SetPopulation', payload: e.target.value })}
  />
  {formState.errors.population && <p className={styles.error}>{formState.errors.population}</p>}

  <input
    type="text"
    placeholder={translations[currentLang].services.from.capcity}
    value={formState.capitalCity}
    onChange={(e) => formDispatch({ type: 'SetCapitalCity', payload: e.target.value })}
  />
  {formState.errors.capitalCity && <p className={styles.error}>{formState.errors.capitalCity}</p>}

  <input
    type="text"
    placeholder={translations[currentLang].services.from.img}
    value={formState.imageUrl}
    onChange={(e) => formDispatch({ type: 'SetImageUrl', payload: e.target.value })}
  />

  <button type="submit" disabled={!isFormValid}>
  {translations[currentLang].services.from.button}
  </button>
</form>

      <div className={styles.catalogContent}>
        {state.countries.map((country, index) => (
          <ProductCard
            key={index}
            id={country.id}
            style={{ opacity: country.isDeleted ? 0.5 : 1 }}
          >
            <ImageComp src={country.imageUrl} alt={`Flag of ${lang === 'en'? country.nameEn: country.nameKa}`} />
            <TextComp
              name={lang === 'en'? country.nameEn: country.nameKa}
              population={country.population}
              capitalCity={lang === 'en'? country.capitalCityEn: country.capitalCityKa}
            />
            <div className={styles.bottom}>
              {!country.isDeleted && (
                <>
                  <button onClick={() => dispatch({ type: 'likeAction', payload: { id: country.id } })}>
                  {translations[currentLang].services.card.like} {country.likecount}
                  </button>
                  <button onClick={() => dispatch({ type: 'deleteCountry', payload: { id: country.id } })}>{translations[currentLang].services.card.delete}</button>
                </>
              )}
              {country.isDeleted && (
                <button onClick={() => dispatch({ type: 'restoreCountry', payload: { id: country.id } })}>
                  {translations[currentLang].services.card.restore}
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
