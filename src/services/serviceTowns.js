import axios from "axios";
const inDev = process.env.NODE_ENV !== "production";

const hyperlocusApi = axios.create({
  baseURL: inDev
    ? "http://localhost:8080"
    : "http://hyperlocus-server.herokuapp.com"
});

export async function getTowns(location) {
  try {
    if (!location) {
      const towns = await hyperlocusApi.get("/towns");
      return towns.data;
    }

    const towns = await hyperlocusApi.get("/towns", {
      location: {
        coordinates: [location.longitude, location.latitude]
      }
    });
    return towns.data;
  } catch (err) {
    console.log(err);
  }
}
