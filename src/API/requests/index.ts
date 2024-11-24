import { httpClient } from "..";
import { Country } from "@/components/typesForCatalog";
import { SortOrder } from "@/components/typesForCatalog";

// Fetch all countries
export const fetchCountries = async (
  sortOrder: SortOrder,
): Promise<Country[]> => {
  try {
    const response = await httpClient.get<Country[]>("/countries", {
      params: { _sort: sortOrder || "likes" }, // Defaults to ascending
    });
    // console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

// Add a new country
export const addCountry = async (country: Country): Promise<Country> => {
  try {
    const response = await httpClient.post<Country>("/countries", country);
    return response.data;
  } catch (error) {
    console.error("Error adding country:", error);
    throw error;
  }
};

// Edit an existing country
export const editCountry = async (country: Country): Promise<Country> => {
  try {
    const response = await httpClient.put<Country>(
      `/countries/${country.id}`,
      country,
    );
    return response.data;
  } catch (error) {
    console.error(`Error editing country with ID ${country.id}:`, error);
    throw error;
  }
};

// Delete a country by ID
export const deleteCountry = async (id: string): Promise<void> => {
  try {
    await httpClient.delete<void>(`/countries/${id}`);
  } catch (error) {
    console.error(`Error deleting country with ID ${id}:`, error);
    throw error;
  }
};


export const updateLikesOnBackend = async (countryId: string, newLikes: number) => {
  try {
    await httpClient.patch(`/countries/${countryId}`, {
      likes: newLikes,
    });
  } catch (error) {
    console.error("Failed to update likes on the backend:", error);
   
  }
  
};
