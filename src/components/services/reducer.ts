// reducers.ts
import {
  State,
  Action,
  FormState,
  FormAction,
  Country,
} from "@/components/typesForCatalog";
import { translations } from "../translations";

export const sortCountries = (countries: Country[], order: string) => {
  const activeCountries = countries.filter((country) => !country.isDeleted);
  const deletedCountries = countries.filter((country) => country.isDeleted);

  if (order === "asc") {
    activeCountries.sort((a, b) => a.likecount - b.likecount);
  } else if (order === "desc") {
    activeCountries.sort((a, b) => b.likecount - a.likecount);
  }

  return [...activeCountries, ...deletedCountries];
};

export const catalogReducer = (state: State, action: Action): State => {
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
    //   const updatedCountries = state.countries.filter(
    //     (country) => country.id !== action.payload.id,
    //   );

    //   return {
    //     ...state,
    //     countries: updatedCountries,
    //     countryCount: state.countryCount - 1,
    //   };
    // }

    // case "restoreCountry": {
    //   const restoredCountries = state.countries.map((country) =>
    //     country.id === action.payload.id
    //       ? { ...country, isDeleted: false }
    //       : country,
    //   );
    //   const sortedCountries = state.sortOrder
    //     ? sortCountries(restoredCountries, state.sortOrder)
    //     : restoredCountries;

    //   return {
    //     ...state,
    //     countries: sortedCountries,
    //   };
    // }

    // case "editCountry": {
    //   const updatedCountries = state.countries.map((country) =>
    //     country.id === action.payload.country.id
    //       ? action.payload.country
    //       : country,
    //   );
    //   return {
    //     ...state,
    //     countries: state.sortOrder
    //       ? sortCountries(updatedCountries, state.sortOrder)
    //       : updatedCountries,
    //   };
    // }

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

export const formReducer = (
  state: FormState,
  action: FormAction,
  currentLang: "en" | "ka",
): FormState => {
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

// Export initial states
export const initialCatalogState: State = {
  countries: [],
  sortOrder: "",
  countryCount: 0,
};

export const initialFormState: FormState = {
  countryNameKa: "",
  countryNameEn: "",
  population: "",
  capitalCityKa: "",
  capitalCityEn: "",
  imageUrl: "",
  imageFile: null,
  errors: { countryName: "", population: "", capitalCity: "" },
};
