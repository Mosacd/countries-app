import React, { useReducer, useState, useRef, useEffect } from "react";
import styles from "./catalog.module.css";
import ProductCard from "./productCard";
import { Country } from "@/components/typesForCatalog"; // all type imports
import ImageComp from "./productCard/imageComp";
import TextComp from "./productCard/textComp";
import { useParams } from "react-router-dom";
import { translations } from "../translations";
import {
  fetchCountries,
  editCountry,
  deleteCountry,
} from "@/API/requests";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  catalogReducer,
  initialCatalogState,
} from "./reducer";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearchParams } from "react-router-dom";
import { sortCountries } from "./reducer";
import SortDropdown from "./sortDropdown/sortDropdown";
import CardFrom from "./cardForm/cardForm";
import EditForm from "./editForm/editForm";

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

       // Handle sorting change to update URL and sort list in state
       const handleSortChange = (order: string) => {
        setSearchParams({ sort: order });
      };

  // Fetch countries using useQuery
  const {
    data: countries = [],
    isLoading,
    error,
  } = useQuery<Country[], Error>({
    queryKey: ["countries", initialSortOrder], // Include initialSortOrder in the query key to trigger refetch
    queryFn: async () => {
      const fetchedCountries: Country[] = await fetchCountries();
      const sortedCountries = sortCountries(fetchedCountries, initialSortOrder); // Apply initial sort order
      catalogDispatch({ type: "initializeCountries", payload: sortedCountries });
      return fetchedCountries;
    },
  });

  const [state, catalogDispatch] = useReducer(catalogReducer, initialCatalogState);

 

  useEffect(() => {
    if (countries.length > 0) {
      const sortedCountries = sortCountries(countries, initialSortOrder);
      catalogDispatch({ type: "initializeCountries", payload: sortedCountries });
    }
  }, [countries, initialSortOrder]); // Re-run effect on countries or sort order change

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: state.countries.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
  });

  

  const editCountryMutation = useMutation({
    mutationFn: editCountry,
    onSuccess: (currentCountry) => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      catalogDispatch({ type: "editCountry", payload: { country: currentCountry } });
      setCurrentCountry(null);
    },
  });

  const deleteCountryMutation = useMutation({
    mutationFn: deleteCountry,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      catalogDispatch({ type: "deleteCountry", payload: { id } });
    },
  });



  const handleEditCountry = (updatedCountry: Country) => {
    editCountryMutation.mutate(updatedCountry);
  };

  const handleDeleteCountry = (id: string) => {
    deleteCountryMutation.mutate(id);
  };

  

  

  if (isLoading)
    return (
      <h1
        style={{
          position: "absolute",
          top: "200px",
          left: "200px",
          fontSize: "25px",
        }}
      >
        Loading countries...
      </h1>
    );
  if (error)
    return (
      <h1
        style={{
          position: "absolute",
          top: "200px",
          left: "200px",
          fontSize: "25px",
        }}
      >
        Error while fetching countries
      </h1>
    );

  return (
    <>
      <h1 className={styles.catalog}>
        {translations[currentLang].services.title}
      </h1>

      <SortDropdown onSortChange = {handleSortChange} searchParams= {searchParams}/>

      <CardFrom catalogDispatch={catalogDispatch} state={state}/>



      <div
        ref={parentRef}
        className={styles.catalogContent}
        style={{
          height: "400px", 
          overflow: "auto",
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
                            catalogDispatch({
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



      {isEditModalOpen && (  <EditForm onEditFormChange={handleEditFormChange}
       onEditFormSubmit ={handleEditFormSubmit}
       editFormState = {editFormState} 
       setEditModalOpen = {setEditModalOpen}/>)}
      
    </>
  );
};

export default Catalog;
