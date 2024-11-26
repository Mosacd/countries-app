// reducers.ts
import {
  // State,
  FormState,
  FormAction,
} from "@/components/typesForCatalog";
import { translations } from "../translations";

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
// export const initialCatalogState: State = {
//   countries: [],
//   sortOrder: null,
//   countryCount: 0,
// };

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
