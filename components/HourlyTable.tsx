import { default as dayjs } from "dayjs";

const HourlyTable = ({ day, hourly }: { day: string; hourly: any[] }) => {
  console.log("hourly: ", hourly);
  //   return;
  return (
    <div className="relative font-mono w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Forecast Temperature
            </th>

            <th scope="col" className="px-6 py-3">
              Probablity
            </th>

            <th scope="col" className="px-6 py-3">
              Forecast Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {hourly &&
            hourly
              .sort((a: any, b: any) => a.startTime - b.startTime)
              .map((item: any, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-bold">
                      {dayjs(item?.startTime).format("HH")}
                    </td>
                    <td className="px-6 py-4">{item.hourly || "N/A"}</td>
                    <td className="px-6 py-4">{item.sustained || "N/A"}</td>
                    <td className="px-6 py-4">{item.gust || "N/A"}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default HourlyTable;
