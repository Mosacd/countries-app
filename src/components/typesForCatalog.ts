export interface Country {
  nameEn: string;
  nameKa: string;
  population: number;
  capitalCityEn: string;
  capitalCityKa: string;
  imageUrl: string;
  textEn: string;
  textKa: string;
  id: string;
  likes: number;
  isDeleted: boolean;
}

export type FormState = {
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

export type FormAction =
  | { type: "SetCountryNameEn"; payload: string }
  | { type: "SetCountryNameKa"; payload: string }
  | { type: "SetPopulation"; payload: string }
  | { type: "SetCapitalCityEn"; payload: string }
  | { type: "SetCapitalCityKa"; payload: string }
  | { type: "SetImageFile"; payload: File | null }
  | { type: "SetImageBase64"; payload: string }
  | { type: "ResetForm" };

export type SortOrder = "likes" | "-likes" | null;

export type State = {
  countries: Country[];
  sortOrder: SortOrder;
  countryCount: number;
};

export type Action =
  | { type: "likeAction"; payload: { id: string } }
  | { type: "deleteCountry"; payload: { id: string } }
  | { type: "restoreCountry"; payload: { id: string } }
  | { type: "addCountry"; payload: { country: Country } }
  | { type: "sortCountries"; payload: { order: string } }
  | { type: "initializeCountries"; payload: Country[] }
  | { type: "editCountry"; payload: { country: Country } };
