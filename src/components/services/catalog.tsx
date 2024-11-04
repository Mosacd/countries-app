import React, { useEffect, useReducer, useState } from "react";
import styles from "./catalog.module.css";
import ProductCard from "./productCard";
import { Country } from "@/components/countriylist";
import ImageComp from "./productCard/imageComp";
import TextComp from "./productCard/textComp";
import { useParams } from "react-router-dom";
import { translations } from "../translations";
import axios from "axios";

type FormState = {
  countryNameEn: string;
  countryNameKa: string;
  population: string;
  capitalCityEn: string;
  capitalCityKa: string;
  imageUrl: string;
  imageFile: File | null;
  errors: {
    countryName: string;
    population: string;
    capitalCity: string;
  };
};

type FormAction =
  | { type: "SetCountryNameEn"; payload: string }
  | { type: "SetCountryNameKa"; payload: string }
  | { type: "SetPopulation"; payload: string }
  | { type: "SetCapitalCityEn"; payload: string }
  | { type: "SetCapitalCityKa"; payload: string }
  | { type: "SetImageFile"; payload: File | null }
  | { type: "SetImageBase64"; payload: string }
  | { type: "ResetForm" };

type State = {
  countries: Country[];
  sortOrder: string;
  countryCount: number;
};

type Action =
  | { type: "likeAction"; payload: { id: string } }
  | { type: "deleteCountry"; payload: { id: string } }
  | { type: "restoreCountry"; payload: { id: string } }
  | { type: "addCountry"; payload: { country: Country } }
  | { type: "sortCountries"; payload: { order: string } }
  | { type: "initializeCountries"; payload: Country[] }
  | { type: "editCountry"; payload: { country: Country } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "initializeCountries":
      return {
        ...state,
        countries: action.payload,
        countryCount: action.payload.length,
      };
    case "likeAction": {
      const updatedCountries = state.countries.map((country) =>
        country.id === action.payload.id
          ? { ...country, likecount: country.likecount + 1 }
          : country,
      );
      return {
        ...state,
        countries: state.sortOrder
          ? sortCountries(updatedCountries, state.sortOrder)
          : updatedCountries,
      };
    }
    // case "deleteCountry": {
    //   const countriesWithDeletion = state.countries.map((country) =>
    //    {if(country.id === action.payload.id){
    //         axios.delete(`http://localhost:3000/${country.id}`).then((response) => console.log(`Country with ID ${country.id} deleted successfully`, response.data))
    //         return{...country, isDeleted: true}
    //    } else{
    //       return country;
    //    }
    //   } 
    //   );
    //   const activeCountries = countriesWithDeletion.filter(
    //     (country) => !country.isDeleted,
    //   );
      // const deletedCountries = countriesWithDeletion.filter(
      //   (country) => country.isDeleted,
      // );

      // return {
      //   ...state,
      //   countries: [...activeCountries /*, {...deletedCountries}*/],
      // };
    // }
    case "deleteCountry": {
      const updatedCountries = state.countries.filter(
        (country) => country.id !== action.payload.id
      );
    
      return {
        ...state,
        countries: updatedCountries,
        countryCount: state.countryCount - 1,
      };
    }
    case "restoreCountry": {
      const restoredCountries = state.countries.map((country) =>
        country.id === action.payload.id
          ? { ...country, isDeleted: false }
          : country,
      );
      const sortedCountries = state.sortOrder
        ? sortCountries(restoredCountries, state.sortOrder)
        : restoredCountries;

      return {
        ...state,
        countries: sortedCountries,
      };
    }
    case "editCountry": {
      const updatedCountries = state.countries.map((country) =>
        country.id === action.payload.country.id ? action.payload.country : country
      );
      return {
        ...state,
        countries: state.sortOrder
          ? sortCountries(updatedCountries, state.sortOrder)
          : updatedCountries,
      };
    }
    case "addCountry": {
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
    case "sortCountries": {
      const sortedCountries = sortCountries(
        state.countries,
        action.payload.order,
      );
      

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

  if (order === "asc") {
    activeCountries.sort((a, b) => a.likecount - b.likecount);
  } else if (order === "desc") {
    activeCountries.sort((a, b) => b.likecount - a.likecount);
  }

  return [...activeCountries, ...deletedCountries];
};

const Catalog: React.FC = () => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const currentLang = lang || "en";
  
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [editFormState, setEditFormState] = useState({
    population: "",
    capitalCityEn: "",
    capitalCityKa: ""
  });

  const openEditModal = (country: Country) => {
    setCurrentCountry(country);
    setEditFormState({
      population: country.population.toString(),
      capitalCityEn: country.capitalCityEn,
      capitalCityKa: country.capitalCityKa
    });
    setEditModalOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCountry) {
      const updatedCountry = {
        ...currentCountry,
        population: parseInt(editFormState.population),
        capitalCityEn: editFormState.capitalCityEn,
        capitalCityKa: editFormState.capitalCityKa,
      };
      handleEditCountry(updatedCountry);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/countries").then((res) => {
      console.log(res.data);
      dispatch({ type: "initializeCountries", payload: res.data });
    });
    
  }, []);




  const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
      case "SetCountryNameEn": {
        const error =
          action.payload.length < 3
            ? translations[currentLang].services.from.errors.nameerr
            : "";
        return {
          ...state,
          countryNameEn: action.payload,
          errors: { ...state.errors, countryName: error },
        };
      }
      case "SetCountryNameKa": {
        const error =
          action.payload.length < 3
            ? translations[currentLang].services.from.errors.nameerr
            : "";
        return {
          ...state,
          countryNameKa: action.payload,
          errors: { ...state.errors, countryName: error },
        };
      }
      case "SetPopulation": {
        const error =
          isNaN(Number(action.payload)) || Number(action.payload) <= 0
            ? translations[currentLang].services.from.errors.populationerr
            : "";
        return {
          ...state,
          population: action.payload,
          errors: { ...state.errors, population: error },
        };
      }
      case "SetCapitalCityEn": {
        const error =
          action.payload.length < 3
            ? translations[currentLang].services.from.errors.capitalcityerr
            : "";
        return {
          ...state,
          capitalCityEn: action.payload,
          errors: { ...state.errors, capitalCity: error },
        };
      }
      case "SetCapitalCityKa": {
        const error =
          action.payload.length < 3
            ? translations[currentLang].services.from.errors.capitalcityerr
            : "";
        return {
          ...state,
          capitalCityKa: action.payload,
          errors: { ...state.errors, capitalCity: error },
        };
      }
      case "SetImageFile":
        return { ...state, imageFile: action.payload };
      case "SetImageBase64":
        return { ...state, imageUrl: action.payload };
      case "ResetForm":
        return {
          countryNameEn: "",
          countryNameKa: "",
          population: "",
          capitalCityEn: "",
          capitalCityKa: "",
          imageUrl: "",
          imageFile: null,
          errors: { countryName: "", population: "", capitalCity: "" },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    countries: [],
    sortOrder: "",
    countryCount: 0,
  });

  const [formState, formDispatch] = useReducer(formReducer, {
    countryNameKa: "",
    countryNameEn: "",
    population: "",
    capitalCityKa: "",
    capitalCityEn: "",
    imageUrl: "",
    imageFile: null,
    errors: { countryName: "", population: "", capitalCity: "" },
  });

  const handleAddCountry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formState.errors.countryName &&
      !formState.errors.population &&
      !formState.errors.capitalCity
    ) {
      const newId = (state.countryCount + 1).toString();
      const newCountry: Country = {
        id: newId,
        nameEn: formState.countryNameEn,
        nameKa: formState.capitalCityKa,
        population: parseInt(formState.population),
        capitalCityEn: formState.capitalCityEn,
        capitalCityKa: formState.capitalCityKa,
        imageUrl: formState.imageUrl,
        likecount: 0,
        textEn: "default text",
        textKa: "ტექსტი",
        isDeleted: false,
      };

    
      axios.post("http://localhost:3000/countries", newCountry).then((res) => {console.log(res.data)});

      dispatch({ type: "addCountry", payload: { country: newCountry } });
      formDispatch({ type: "ResetForm" });
    }
  };

  const handleEditCountry = (updatedCountry: Country) => {
    axios
      .put(`http://localhost:3000/countries/${updatedCountry.id}`, updatedCountry)
      .then((response) => {
        console.log(`Country with ID ${updatedCountry.id} updated successfully`, response.data);
        dispatch({ type: "editCountry", payload: { country: response.data } });
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.error(`Error updating country with ID ${updatedCountry.id}:`, error);
      });
  };

  const handleDeleteCountry = (id: string) => {
    axios
      .delete(`http://localhost:3000/countries/${id}`)
      .then((response) => {
        console.log(`Country with ID ${id} deleted successfully`, response.data);
        // Dispatch an action to update the state
        dispatch({ type: "deleteCountry", payload: { id } });
      })
      .catch((error) => {
        console.error(`Error deleting country with ID ${id}:`, error);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formDispatch({ type: "SetImageFile", payload: file });
        formDispatch({
          type: "SetImageBase64",
          payload: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      formDispatch({ type: "SetImageFile", payload: null });
      formDispatch({ type: "SetImageBase64", payload: "" });
    }
  };

  const isFormValid =
    !formState.errors.countryName &&
    !formState.errors.population &&
    !formState.errors.capitalCity &&
    formState.countryNameEn.length > 2 &&
    formState.countryNameKa.length > 2 &&
    formState.capitalCityEn.length > 2 &&
    formState.capitalCityKa.length > 2 &&
    Number(formState.population) > 0 &&
    formState.imageFile !== null;

  return (
    <>
      <h1 className={styles.catalog}>
        {translations[currentLang].services.title}
      </h1>

      <div className={styles.sortDropdown}>
        <label htmlFor="sort">
          {translations[currentLang].services.sort.text}
        </label>
        <select
          id="sort"
          value={state.sortOrder}
          onChange={(e) =>
            dispatch({
              type: "sortCountries",
              payload: { order: e.target.value },
            })
          }
        >
          <option value="">
            {translations[currentLang].services.sort.select}
          </option>
          <option value="asc">
            {translations[currentLang].services.sort.asc}
          </option>
          <option value="desc">
            {translations[currentLang].services.sort.desc}
          </option>
        </select>
      </div>

      <form onSubmit={handleAddCountry} className={styles.form}>
        <input
          type="text"
          placeholder={translations[currentLang].services.from.nameEn}
          value={formState.countryNameEn}
          onChange={(e) =>
            formDispatch({ type: "SetCountryNameEn", payload: e.target.value })
          }
        />
        <input
          type="text"
          placeholder={translations[currentLang].services.from.nameKa}
          value={formState.countryNameKa}
          onChange={(e) =>
            formDispatch({ type: "SetCountryNameKa", payload: e.target.value })
          }
        />
        {formState.errors.countryName && (
          <p className={styles.error}>{formState.errors.countryName}</p>
        )}

        <input
          type="text"
          placeholder={translations[currentLang].services.from.population}
          value={formState.population}
          onChange={(e) =>
            formDispatch({ type: "SetPopulation", payload: e.target.value })
          }
        />
        {formState.errors.population && (
          <p className={styles.error}>{formState.errors.population}</p>
        )}

        <input
          type="text"
          placeholder={translations[currentLang].services.from.capcityEn}
          value={formState.capitalCityEn}
          onChange={(e) =>
            formDispatch({ type: "SetCapitalCityEn", payload: e.target.value })
          }
        />
        <input
          type="text"
          placeholder={translations[currentLang].services.from.capcityKa}
          value={formState.capitalCityKa}
          onChange={(e) =>
            formDispatch({ type: "SetCapitalCityKa", payload: e.target.value })
          }
        />
        {formState.errors.capitalCity && (
          <p className={styles.error}>{formState.errors.capitalCity}</p>
        )}

        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        {formState.imageFile === null && (
          <p className={styles.error}>
            Please upload a valid image file (JPG/PNG).
          </p>
        )}

        <button type="submit" disabled={!isFormValid}>
          {translations[currentLang].services.from.button}
        </button>
        {!isFormValid && (
          <p className={styles.error}>{"fill with valid inputs"}</p>
        )}
      </form>

      <div className={styles.catalogContent}>
        {state.countries.map((country, index) => (
          <ProductCard
            key={index}
            id={country.id}
            style={{ opacity: country.isDeleted ? 0.5 : 1 }}
          >
            <ImageComp
              src={country.imageUrl}
              alt={`Flag of ${lang === "en" ? country.nameEn : country.nameKa}`}
            />
            <TextComp
              name={lang === "en" ? country.nameEn : country.nameKa}
              population={country.population}
              capitalCity={
                lang === "en" ? country.capitalCityEn : country.capitalCityKa
              }
            />
            <div className={styles.bottom}>
              {!country.isDeleted && (
                <>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "likeAction",
                        payload: { id: country.id },
                      })
                    }
                  >
                    {translations[currentLang].services.card.like}{" "}
                    {country.likecount}
                  </button>
                  <button
                    onClick={() => handleDeleteCountry(country.id)}
                  >
                    {translations[currentLang].services.card.delete}
                  </button>
                </>
              )}
              {/* {country.isDeleted && (
                <button
                  onClick={() =>
                    dispatch({
                      type: "restoreCountry",
                      payload: { id: country.id },
                    })
                  }
                >
                  {translations[currentLang].services.card.restore}
                </button>
              )} */}
              <button onClick={() => openEditModal(country)}>Edit</button>
            </div>
          </ProductCard>
        ))}
      </div>

      {isEditModalOpen && (
        <div className={styles.editDiv}>
          <h2>{translations[currentLang].services.card.edit}</h2>
          <form onSubmit={handleEditFormSubmit}>
            <label>
              {translations[currentLang].services.from.population}
              <input
                type="text"
                name="population"
                value={editFormState.population}
                onChange={handleEditFormChange}
              />
            </label>
            <label>
              {translations[currentLang].services.from.capcityEn}
              <input
                type="text"
                name="capitalCityEn"
                value={editFormState.capitalCityEn}
                onChange={handleEditFormChange}
              />
            </label>
            <label>
              {translations[currentLang].services.from.capcityKa}
              <input
                type="text"
                name="capitalCityKa"
                value={editFormState.capitalCityKa}
                onChange={handleEditFormChange}
              />
            </label>
            <button type="submit">{translations[currentLang].services.from.editButton}</button>
            <button type="button" onClick={() => setEditModalOpen(false)}>
              {translations[currentLang].services.from.cancel}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Catalog;
