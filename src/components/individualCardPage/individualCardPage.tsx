import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./individualCardPage.module.css";
import { Country } from "../typesForCatalog";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/API";

const CardPage: React.FC = () => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const { id } = useParams();

  const [countryInfo, setCountryInfo] = useState<Country>();

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(`http://localhost:3000/countries/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setCountryInfo(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch(() => {
  //       setCountryInfo(undefined);
  //       setIsLoading(false);
  //       console.log("country with given id can't be found");
  //     });
  // }, [id]);

  const fetchSingleCountry = async (): Promise<Country> => {
    try {
      const response = await httpClient.get<Country>(`/countries/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching country with id ${id}:`, error);
      throw error;
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["single-country"],
    queryFn: async () => {
      const fetchedCountry: Country = await fetchSingleCountry();
      setCountryInfo(fetchedCountry);
      return fetchedCountry;
    },
  });

  console.log(isLoading);

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
