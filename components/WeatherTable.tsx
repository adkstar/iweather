import { WEEKDAYS } from "@/constants";
import TableRow from "./TableRow";
import ColorBadge from "./ColorBadge";

const WeatherTable = ({
  grouped,
  setSelectedDay,
}: {
  grouped: any;
  setSelectedDay: any;
}) => {
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
                    <td
                      onClick={() => setSelectedDay(item.day)}
                      key={index}
                      className="px-6 py-4"
                    >
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                        {" "}
                        {item.date}
                      </span>
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
                    <td
                      onClick={() => setSelectedDay(item.day)}
                      key={index}
                      className="px-6 py-4"
                    >
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
                    <td
                      onClick={() => setSelectedDay(item.day)}
                      key={index}
                      className="px-6 py-4"
                    >
                      {/* {item.high} */}

                      <ColorBadge amount={item.high} />
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
                    <td
                      onClick={() => setSelectedDay(item.day)}
                      key={index}
                      className="px-6 py-4"
                    >
                      {/* {item.low} */}
                      <ColorBadge amount={item.low} low={true} />
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
