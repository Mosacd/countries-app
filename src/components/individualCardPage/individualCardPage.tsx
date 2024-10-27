import React from "react";
import { useParams } from "react-router-dom";
import { initialCountries } from "../countriylist";
import styles from "./individualCardPage.module.css";

const CardPage: React.FC = () => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const { id } = useParams();

  const countryInfo = initialCountries.find((country) => country.id == id);

  if (!countryInfo) {
    return (
      <div style={{ marginTop: "140px", fontSize: "2rem" }}>Not Found</div>
    );
  }

  return (
    <div className={styles.cardpagediv}>
      <h1>
        {lang === "en" ? countryInfo.capitalCityEn : countryInfo.capitalCityKa}
      </h1>
      <p>{lang === "en" ? countryInfo.textEn : countryInfo.textKa}</p>
      <img src={countryInfo.imageUrl} alt="image" />
    </div>
  );
};

export default CardPage;
