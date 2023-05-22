import { WEEKDAYS } from "@/constants";
import TableRow from "./TableRow";

const WeatherTable = ({ grouped }: { grouped: any }) => {
  return (
    <div className="relative font-mono w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th></th>
            {WEEKDAYS.map((day) => {
              return (
                <th key={day} scope="col" className="px-6 py-3">
                  {day}
                </th>
              );
            })}

            {/*  <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {grouped && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-bold">Date</td>
              {Object.values(grouped)
                .sort((a: any, b: any) => a.startTime - b.startTime)
                .map((item: any, index) => {
                  return (
                    <td key={index} className="px-6 py-4">
                      {item.date}
                    </td>
                  );
                })}
            </tr>
          )}

          {grouped && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-bold">Day of Week</td>

              {Object.values(grouped)
                .sort((a: any, b: any) => a.startTime - b.startTime)
                .map((item: any, index) => {
                  return (
                    <td key={index} className="px-6 py-4">
                      {item.day}
                    </td>
                  );
                })}
            </tr>
          )}

          {grouped && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-bold">High</td>

              {Object.values(grouped)
                .sort((a: any, b: any) => a.startTime - b.startTime)
                .map((item: any, index) => {
                  return (
                    <td key={index} className="px-6 py-4">
                      {item.high}
                    </td>
                  );
                })}
            </tr>
          )}

          {grouped && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-bold">Low</td>

              {Object.values(grouped)
                .sort((a: any, b: any) => a.startTime - b.startTime)
                .map((item: any, index) => {
                  return (
                    <td key={index} className="px-6 py-4">
                      {item.low}
                    </td>
                  );
                })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
