import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./individualCardPage.module.css";
import axios from "axios";
import { Country } from "../typesForCatalog";

const CardPage: React.FC = () => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const { id } = useParams();

  const [countryInfo, setCountryInfo] = useState<Country>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/countries/${id}`)
      .then((res) => {
        console.log(res.data);
        setCountryInfo(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setCountryInfo(undefined);
        setIsLoading(false);
        console.log("country with given id can't be found");
      });
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ marginTop: "140px", fontSize: "2rem" }}>...Loading</div>
    );
  } else if (!countryInfo) {
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
