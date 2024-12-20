import React, {
  /*useReducer*/ useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import styles from "./catalog.module.css";
import ProductCard from "./productCard";
import { Country /*State*/ } from "@/components/typesForCatalog"; // all type imports
import ImageComp from "./productCard/imageComp";
import TextComp from "./productCard/textComp";
import { useParams } from "react-router-dom";
import { translations } from "../translations";
import {
  fetchCountries,
  editCountry,
  deleteCountry,
  updateLikesOnBackend,
} from "@/API/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { /*catalogReducer*/ initialCatalogState } from "./reducer";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSearchParams } from "react-router-dom";
// import { sortCountries } from "./reducer";
import SortDropdown from "./sortDropdown/sortDropdown";
import CardFrom from "./cardForm/cardForm";
import EditForm from "./editForm/editForm";
import { SortOrder } from "@/components/typesForCatalog";
import { useInfiniteQuery } from "@tanstack/react-query";

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
  const initialSortOrder: SortOrder =
    searchParams.get("sort") === "desc"
      ? "-likes"
      : searchParams.get("sort") === "asc"
        ? "likes"
        : null;

  console.log("Initial Sort Order:", initialSortOrder);

  // Handle sorting change to update URL and sort list in state
  const handleSortChange = (order: string) => {
    setSearchParams({ sort: order });
  };

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["countries", initialSortOrder], // Include sorting in queryKey
    queryFn: ({ pageParam = 0 }) =>
      fetchCountries(initialSortOrder || "likes", pageParam, 10), // Fetch 10 items per page
    getNextPageParam: (lastPage) => lastPage.nextOffset, // Define the next offset
    initialPageParam: 0, // Start from offset 0
  });

  const countries = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data?.pages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const bottomMarker = document.querySelector("#bottom-marker");
    if (bottomMarker) observer.observe(bottomMarker);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const likeCountryMutation = useMutation({
    mutationFn: async ({
      countryId,
      newLikes,
    }: {
      countryId: string;
      newLikes: number;
    }) => {
      await updateLikesOnBackend(countryId, newLikes);
    },
    onSuccess: () => {
      // Refetch the countries query to reflect the new likes
      queryClient.invalidateQueries({ queryKey: ["countries"], exact: false });
    },
  });

  //   const [state, setState] = useState<State>(initialCatalogState);

  //  const handleSetState = () =>{
  //   setState({
  //     ...state,
  //     countries: data || [], // Data is already sorted by the server
  //     countryCount: (data || []).length,
  //   });
  //  }

  //   useEffect(() => {
  //     if (!isLoading && !error) {
  //       handleSetState();
  //     }
  //   }, [data, isLoading, error]); // Re-run whenever fetched data or loading/error states change

  const handleLike = (countryId: string, currentLikes: number) => {
    likeCountryMutation.mutate({ countryId, newLikes: currentLikes + 1 });
  };

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: countries.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150,
    overscan: 5,
  });

  const editCountryMutation = useMutation({
    mutationFn: editCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });

      setCurrentCountry(null);
    },
  });

  const deleteCountryMutation = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["countries"] });
    },
  });

  const handleEditCountry = (updatedCountry: Country) => {
    editCountryMutation.mutate(updatedCountry);
  };

  const handleDeleteCountry = (id: string) => {
    deleteCountryMutation.mutate(id);
  };

  useEffect(() => {
    virtualizer.measure();
  }, [countries, virtualizer]);

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

      <SortDropdown
        onSortChange={handleSortChange}
        searchParams={searchParams}
      />

      <CardFrom countriesdata={countries} />

      <div
        ref={parentRef}
        className={styles.catalogContent}
        style={{
          borderWidth: "10px",
          borderRadius: "10px",
          borderColor: "#05203c",
          borderStyle: "solid",
          height: "600px",
          overflow: "auto",
          display: "flex",
          padding: "20px",
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
            const country = countries[virtualRow.index];
            return (
              <div
                key={country.id}
                style={{
                  position: "absolute",
                  top: virtualRow.start,
                  left: 0,
                  width: "100%",

                  // transform: `translateY(${virtualRow.start}px)`,
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
                          onClick={() => handleLike(country.id, country.likes)}
                        >
                          {translations[currentLang].services.card.like}{" "}
                          {country.likes}
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
          <div
            id="bottom-marker"
            style={{
              position: "absolute",
              bottom: 0,
              height: "1px",
              width: "100%",
            }}
          />
        </div>
        {isFetchingNextPage && <div>Loading more countries...</div>}
      </div>

      {isEditModalOpen && (
        <EditForm
          onEditFormChange={handleEditFormChange}
          onEditFormSubmit={handleEditFormSubmit}
          editFormState={editFormState}
          setEditModalOpen={setEditModalOpen}
        />
      )}
    </>
  );
};

export default Catalog;
