import { FormState, FormAction, Action } from "@/components/typesForCatalog";
import { addCountry } from "@/API/requests";
import { formReducer, initialFormState } from ".././reducer";
import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Dispatch } from "react";
import { State } from "@/components/typesForCatalog";
import { translations } from "@/components/translations";
import { Country } from "@/components/typesForCatalog";
import styles from "./cardForm.module.css";

const CardFrom: React.FC<{
  catalogDispatch: Dispatch<Action>;
  state: State;
}> = ({ catalogDispatch, state }) => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const currentLang = lang || "en";

  const [formState, formDispatch] = useReducer(
    (state: FormState, action: FormAction) =>
      formReducer(state, action, currentLang),
    initialFormState,
  );

  const queryClient = useQueryClient();
  // useMutation for adding a country
  const addCountryMutation = useMutation({
    mutationFn: addCountry,
    onSuccess: (newCountry) => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      catalogDispatch({ type: "addCountry", payload: { country: newCountry } });
    },
  });

  const handleAddCountry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      const newCountry: Country = {
        id: (state.countryCount + 1).toString(),
        nameEn: formState.countryNameEn,
        nameKa: formState.countryNameKa,
        population: parseInt(formState.population),
        capitalCityEn: formState.capitalCityEn,
        capitalCityKa: formState.capitalCityKa,
        imageUrl: formState.imageUrl,
        likes: 0,
        textEn: "default text",
        textKa: "ტექსტი",
        isDeleted: false,
      };
      addCountryMutation.mutate(newCountry);
      formDispatch({ type: "ResetForm" });
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

  return (
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
  );
};

export default CardFrom;
