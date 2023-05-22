"use client";

import WeatherTable from "@/components/WeatherTable";
import HourlyTable from "@/components/HourlyTable";
import { default as dayjs } from "dayjs";
import { getLatLangByLocation } from "@/api/geocoding";
import { getWeatherDataByLatLng } from "@/api/weather";
import { useState } from "react";
import { WEEKDAYS } from "@/constants";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [grouped, setGrouped] = useState<any>(undefined);
  const [locationName, setLocationName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string>("");

  const handleSearch = async () => {
    console.log("Handling search: ", search);

    if (!search) {
      setError("Please enter an input");
      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    setLoading(true);

    const geocodingResult = await getLatLangByLocation(search);

    setLocationName(geocodingResult.display_name);

    // add showing data for geocodingResult.display_name before table

    const latitude = geocodingResult.lat;
    const longitude = geocodingResult.lon;

    const weatherResult: any = await getWeatherDataByLatLng(
      latitude,
      longitude
    );
    console.log("Watherrr: ", weatherResult);

    const grouped = weatherResult.reduce(function (a: any, e: any) {
      // GROUP BY estimated key (estKey), well, may be a just plain key
      // a -- Accumulator result object
      // e -- sequentally checked Element, the Element that is tested just at this itaration

      // new grouping name may be calculated, but must be based on real value of real field
      let estKey = WEEKDAYS[e.startTime.getDay()];

      (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
      return a;
    }, {});

    const realData: any = [];

    for (const [key, value] of Object.entries(grouped)) {
      //   console.log(`${key}: `, value);

      const hoursOfDay: any = value;
      const firstDate = hoursOfDay[0];

      const formattedDate = dayjs(firstDate?.startTime).format("YYYY/MM/DD"); // display

      const highTemp = Math.max(
        ...hoursOfDay.map((item: any) => {
          return item["hourly"];
        })
      );
      const lowTemp = Math.min(
        ...hoursOfDay.map((item: any) => item["hourly"])
      );

      const dayOfWeek = WEEKDAYS[firstDate?.startTime.getDay()];

      console.log("High: ", highTemp);
      console.log("Low: ", lowTemp);
      console.log("Date: ", formattedDate);
      console.log("Day: ", dayOfWeek);

      realData[key] = {
        startTime: firstDate?.startTime?.getDay(),
        high: highTemp,
        low: lowTemp,
        date: formattedDate,
        day: dayOfWeek,
        hours: hoursOfDay,
      };
    }

    console.log("Grouped data: ", realData);
    setGrouped(realData);
    setLoading(false);
  };

  const handleCellClick = (day: string) => {
    console.log("Day: ", day);
    setSelectedDay(day);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between  text-sm flex flex-col gap-10">
        {/* Search form */}
        <form className="w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter location to get weather history"
            />
            <button
              onClick={handleSearch}
              type="button"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error!</span> {error}
          </div>
        )}

        {loading && !error && !grouped && (
          <div className="font-bold text-lg">Loading results...</div>
        )}

        {locationName && grouped && (
          <div className="font-bold text-lg">
            <span className="text-black/60">Showing results for: </span>{" "}
            <span className="text text-blue-800">{locationName}</span>
          </div>
        )}

        {locationName && grouped && (
          <WeatherTable
            setSelectedDay={(day: string) => handleCellClick(day)}
            grouped={grouped}
          />
        )}

        {selectedDay && (
          <div className="font-bold text-lg">
            <span className="text-black/60">Showing data for: </span>{" "}
            <span className="text text-blue-800">{selectedDay}</span>
          </div>
        )}
        {selectedDay && grouped && (
          <HourlyTable day={selectedDay} hourly={grouped[selectedDay].hours} />
        )}
      </div>
    </main>
  );
}
