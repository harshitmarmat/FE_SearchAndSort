import { useCallback, useState } from "react";

const tableData = [
  { id: 1, name: "John Doe", age: 28, city: "New York" },
  { id: 3, name: "Peter Johnson", age: 40, city: "Seattle" },
  { id: 2, name: "Jane Smith", age: 32, city: "San Francisco" },
];

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Table = () => {
  const [data, setData] = useState(tableData);
  const [searchValue, setSearchValue] = useState("");

  const sortingHandler = (name, type) => {
    // const sort_data = ≥÷
    let sorted_data;
    if (type === "string") {
      sorted_data = data.sort((a, b) => a[name].localeCompare(b[name]));
    } else {
      sorted_data = data.sort((a, b) => a.age - b.age);
    }
    setData([...sorted_data]); // setData(sort_data) not worked
    console.log(sorted_data);
  };

  const searchHandler = (value) => {
    const searched_data = tableData.filter(
      (d) =>
        d.name.toLowerCase().includes(value.toLowerCase()) ||
        d.city.toLowerCase().includes(value.toLowerCase())
    );
    setData(searched_data);
  };

  const debounceHandler = useCallback(debounce(searchHandler, 500));
  console.log("data", data);
  return (
    <div>
      <input
        value={searchValue}
        placeholder="Search"
        onChange={(e) => {
          setSearchValue(e.target.value);
          debounceHandler(e.target.value);
        }}
      />
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th onClick={() => sortingHandler("name", "string")}>Name</th>
              <th onClick={() => sortingHandler("age", "integer")}>Age</th>
              <th onClick={() => sortingHandler("city", "string")}>City</th>
            </tr>
          </thead>
          <tbody>
            {data.map((td, ind) => (
              <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{td.name}</td>
                <td>{td.age}</td>
                <td>{td.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Record Found</div>
      )}
    </div>
  );
};

export default Table;
