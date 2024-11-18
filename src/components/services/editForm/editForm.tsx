import { translations } from "@/components/translations";
import { useParams } from "react-router-dom";
import styles from "./editForm.module.css";

const EditForm: React.FC<{
  onEditFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editFormState: {
    population: string;
    capitalCityEn: string;
    capitalCityKa: string;
  };
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  onEditFormChange,
  onEditFormSubmit,
  editFormState,
  setEditModalOpen,
}) => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const currentLang = lang || "en";

  return (
    <div className={styles.editDiv}>
      <h2>{translations[currentLang].services.card.edit}</h2>
      <form onSubmit={onEditFormSubmit}>
        <label>
          {translations[currentLang].services.from.population}
          <input
            type="text"
            name="population"
            value={editFormState.population}
            onChange={onEditFormChange}
          />
        </label>
        <label>
          {translations[currentLang].services.from.capcityEn}
          <input
            type="text"
            name="capitalCityEn"
            value={editFormState.capitalCityEn}
            onChange={onEditFormChange}
          />
        </label>
        <label>
          {translations[currentLang].services.from.capcityKa}
          <input
            type="text"
            name="capitalCityKa"
            value={editFormState.capitalCityKa}
            onChange={onEditFormChange}
          />
        </label>
        <button type="submit">
          {translations[currentLang].services.from.editButton}
        </button>
        <button type="button" onClick={() => setEditModalOpen(false)}>
          {translations[currentLang].services.from.cancel}
        </button>
      </form>
    </div>
  );
};

export default EditForm;
