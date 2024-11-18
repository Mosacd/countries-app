import styles from "./sortDropdown.module.css";
import { useParams } from "react-router-dom";
import { translations } from "@/components/translations";

const SortDropdown: React.FC<{
  onSortChange: (oreder: string) => void;
  searchParams: URLSearchParams;
}> = ({ onSortChange, searchParams }) => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const currentLang = lang || "en";

  return (
    <div className={styles.sortDropdown}>
      <label htmlFor="sort">
        {translations[currentLang].services.sort.text}
      </label>
      <select
        id="sort"
        value={searchParams.get("sort") || ""}
        onChange={(e) => onSortChange(e.target.value)}
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
  );
};

export default SortDropdown;
