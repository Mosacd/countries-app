import axios from "axios";
import { promises as fs } from "fs";

async function convertImageToBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.log("Error converting image:", error.message);
    return imageUrl;
  }
}

async function seedDatabase() {
  try {
    let existingData = { countries: [] };
    try {
      const data = await fs.readFile("database.json", "utf8");
      existingData = JSON.parse(data);
    } catch (error) {
      console.log("Creating new database.json file");
    }

    const response = await axios.get("https://restcountries.com/v3.1/all");
    const countries = response.data;

    const processedCountries = await Promise.all(
      countries.map(async (country) => ({
        nameEn: country.name.common,
        nameKa: country.name.common,
        population: country.population,
        capitalCityEn: country.capital?.[0] || "N/A",
        capitalCityKa: country.capital?.[0] || "N/A",
        imageUrl: await convertImageToBase64(country.flags.png),
        textEn: `${country.name.common} is a country in ${country.region}.`,
        textKa: `${country.name.common} არის ქვეყანა ${country.region}-ში.`,
        id: country.cca3.toLowerCase(),
        likecount: 0,
        isDeleted: false,
      })),
    );

    existingData.countries = [...existingData.countries, ...processedCountries];
    await fs.writeFile("database.json", JSON.stringify(existingData, null, 2));

    console.log("Database updated successfully!");
  } catch (error) {
    console.log("Error:", error.message);
  }
}

seedDatabase();
