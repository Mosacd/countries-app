// reducers.ts
import {
  State,
  Action,
  FormState,
  FormAction,
  // Country,
} from "@/components/typesForCatalog";
import { translations } from "../translations";
// import { updateLikesOnBackend } from "@/API/requests";



export const catalogReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "initializeCountries":
      return {
        ...state,
        countries: action.payload, // Data is already sorted by the server
        countryCount: action.payload.length,
      };
    

      // case "likeAction": {
        
      //   const updatedCountries = state.countries.map((country) =>{
      //     if(country.id === action.payload.id){
      //       updateLikesOnBackend(action.payload.id, country.likes + 1);

      //       return{ ...country, likes: country.likes + 1 }
      //     } else{
      //       return country;
      //     }
      //   }
      //   );
      
        
        
      //   return {
      //     ...state,
      //     countries: updatedCountries, // Keep the same order as received from the backend
      //   };
      // }
      

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
  sortOrder: null,
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
