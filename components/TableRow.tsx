const TableRow = ({ data }: { data: any }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {data.map((item: any, index: number) => {
        return (
          <td key={index} className="px-6 py-4">
            {item}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
