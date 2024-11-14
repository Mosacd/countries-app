import React, { useReducer, useState, useRef, useEffect } from "react";
import styles from "./catalog.module.css";
import ProductCard from "./productCard";
import { Country, FormState, FormAction } from "@/components/typesForCatalog"; // all type imports
import ImageComp from "./productCard/imageComp";
import TextComp from "./productCard/textComp";
import { useParams } from "react-router-dom";
import { translations } from "../translations";
import {
  fetchCountries,
  addCountry,
  editCountry,
  deleteCountry,
} from "@/API/requests";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  catalogReducer,
  formReducer,
  initialCatalogState,
  initialFormState,
} from "./reducer";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearchParams } from "react-router-dom";
import { sortCountries } from "./reducer";

const Catalog: React.FC = () => {
  const { lang } = useParams<{ lang: "en" | "ka" }>();
  const currentLang = lang || "en";

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [editFormState, setEditFormState] = useState({
    population: "",
    capitalCityEn: "",
    capitalCityKa: "",
  });

  const openEditModal = (country: Country) => {
    setCurrentCountry(country);
    setEditFormState({
      population: country.population.toString(),
      capitalCityEn: country.capitalCityEn,
      capitalCityKa: country.capitalCityKa,
    });
    setEditModalOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCountry) {
      const updatedCountry = {
        ...currentCountry,
        population: parseInt(editFormState.population),
        capitalCityEn: editFormState.capitalCityEn,
        capitalCityKa: editFormState.capitalCityKa,
      };
      handleEditCountry(updatedCountry);
    }
  };

  const queryClient = useQueryClient();

  // SearchParams for storing the sort order in URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Retrieve the initial sort order from searchParams or set a default
  const initialSortOrder = searchParams.get("sort") || "";

  // Fetch countries using useQuery
  // Fetch countries with React Query
  const {
    data: countries = [],
    isLoading,
    error,
  } = useQuery<Country[], Error>({
    queryKey: ["countries", initialSortOrder], // Include initialSortOrder in the query key to trigger refetch
    queryFn: async () => {
      const fetchedCountries: Country[] = await fetchCountries();
      const sortedCountries = sortCountries(fetchedCountries, initialSortOrder); // Apply initial sort order
      dispatch({ type: "initializeCountries", payload: sortedCountries });
      return fetchedCountries;
    },
  });

  const [state, dispatch] = useReducer(catalogReducer, initialCatalogState);

  // Handle sorting change to update URL and sort list in state
  const handleSortChange = (order: string) => {
    setSearchParams({ sort: order });
  };

  useEffect(() => {
    if (countries.length > 0) {
      const sortedCountries = sortCountries(countries, initialSortOrder);
      dispatch({ type: "initializeCountries", payload: sortedCountries });
    }
  }, [countries, initialSortOrder]); // Re-run effect on countries or sort order change

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: state.countries.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
  });

  const [formState, formDispatch] = useReducer(
    (state: FormState, action: FormAction) =>
      formReducer(state, action, currentLang),
    initialFormState,
  );

  // useMutation for adding a country
  const addCountryMutation = useMutation({
    mutationFn: addCountry,
    onSuccess: (newCountry) => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      dispatch({ type: "addCountry", payload: { country: newCountry } });
    },
  });

  const editCountryMutation = useMutation({
    mutationFn: editCountry,
    onSuccess: (currentCountry) => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      dispatch({ type: "editCountry", payload: { country: currentCountry } });
      setCurrentCountry(null);
    },
  });

  const deleteCountryMutation = useMutation({
    mutationFn: deleteCountry,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      dispatch({ type: "deleteCountry", payload: { id } });
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
        likecount: 0,
        textEn: "default text",
        textKa: "ტექსტი",
        isDeleted: false,
      };
      addCountryMutation.mutate(newCountry);
      formDispatch({ type: "ResetForm" });
    }
  };

  const handleEditCountry = (updatedCountry: Country) => {
    editCountryMutation.mutate(updatedCountry);
  };

  const handleDeleteCountry = (id: string) => {
    deleteCountryMutation.mutate(id);
  };

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

  if (isLoading)
    return <h1 style={{ position:"absolute", top:'200px', left:'200px', fontSize:'25px' }}>Loading countries...</h1>;
  if (error)
    return (
      <h1 style={{ position:"absolute", top:'200px', left:'200px', fontSize:'25px'}}>Error while fetching countries</h1>
    );

  return (
    <>
      <h1 className={styles.catalog}>
        {translations[currentLang].services.title}
      </h1>

      <div className={styles.sortDropdown}>
        <label htmlFor="sort">
          {translations[currentLang].services.sort.text}
        </label>
        <select
          id="sort"
          value={searchParams.get("sort") || ""}
          onChange={(e) => handleSortChange(e.target.value)}
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

      <div
        ref={parentRef}
        className={styles.catalogContent}
        style={{
          height: "400px", // Adjust based on your layout
          overflow: "auto", // Enables scroll
          display: "flex",
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const country = state.countries[virtualRow.index];
            return (
              <div
                key={country.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",

                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <ProductCard id={country.id}>
                  <ImageComp
                    src={country.imageUrl}
                    alt={`Flag of ${lang === "en" ? country.nameEn : country.nameKa}`}
                  />
                  <TextComp
                    name={lang === "en" ? country.nameEn : country.nameKa}
                    population={country.population}
                    capitalCity={
                      lang === "en"
                        ? country.capitalCityEn
                        : country.capitalCityKa
                    }
                  />
                  <div className={styles.bottom}>
                    {!country.isDeleted && (
                      <>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "likeAction",
                              payload: { id: country.id },
                            })
                          }
                        >
                          {translations[currentLang].services.card.like}{" "}
                          {country.likecount}
                        </button>
                        <button onClick={() => handleDeleteCountry(country.id)}>
                          {translations[currentLang].services.card.delete}
                        </button>
                      </>
                    )}
                    <button onClick={() => openEditModal(country)}>Edit</button>
                  </div>
                </ProductCard>
              </div>
            );
          })}
        </div>
      </div>

      {isEditModalOpen && (
        <div className={styles.editDiv}>
          <h2>{translations[currentLang].services.card.edit}</h2>
          <form onSubmit={handleEditFormSubmit}>
            <label>
              {translations[currentLang].services.from.population}
              <input
                type="text"
                name="population"
                value={editFormState.population}
                onChange={handleEditFormChange}
              />
            </label>
            <label>
              {translations[currentLang].services.from.capcityEn}
              <input
                type="text"
                name="capitalCityEn"
                value={editFormState.capitalCityEn}
                onChange={handleEditFormChange}
              />
            </label>
            <label>
              {translations[currentLang].services.from.capcityKa}
              <input
                type="text"
                name="capitalCityKa"
                value={editFormState.capitalCityKa}
                onChange={handleEditFormChange}
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
      )}
    </>
  );
};

export default Catalog;
