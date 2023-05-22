import { GEOCODING_API_URL } from "@/constants";
import axios from "axios";

export const getLatLangByLocation = async (location: string) => {
  // https://nominatim.openstreetmap.org/search.php?q=60614&polygon_geojson=0&format=jsonv2

  try {
    const response = await axios.get(`${GEOCODING_API_URL}${location}`);
    console.log("Response:: ", response);

    if (response.status == 200) {
      const results = response.data;

      if (results?.length > 0) return results[0];
    }
    return;
  } catch (error) {
    console.log("Error getting location data");
  }
};
