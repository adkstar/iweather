import { WEATHER_API_URL } from "@/constants";
import { parseForecast } from "@/utils/NwsApiHelpers";
import axios from "axios";

export const getWeatherDataByLatLng = async (lat: string, lon: string) => {
  // https://forecast.weather.gov/MapClick.php?lat=41.8787297&lon=-87.6318428&FcstType=digitalDWML

  try {
    const response = await axios.get(
      `${WEATHER_API_URL}&lat=${lat}&lon=${lon}`
    );
    console.log("Weather Response:: ", response);

    if (response.status == 200) {
      const xmlData = response.data;
      const result = parseForecast(xmlData);
      console.log("Parsed XML: ", result);

      return result;
    }

    // if (response.status == 200) {
    //   const results = response.data;

    //   if (results?.length > 0) return results[0];
    // }
    return;
  } catch (error) {
    console.log("Error getting location data");
  }
};
