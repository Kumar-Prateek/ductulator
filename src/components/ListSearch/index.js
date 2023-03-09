import SoftInput from "components/SoftInput";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function ListSearch({ list, setData, searchKey, setIsSearch }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search && search?.length > 0) {
      const d = [...list]
        .filter((item) => item[searchKey]?.toLowerCase()?.includes(search?.toLowerCase()))
        .map((item) => item);
      setData([...d]);
      setIsSearch(true);
    } else {
      setData(list);
      setIsSearch(false);
    }
  }, [search, list]);

  return (
    <SoftInput
      icon={{
        component: "search",
        direction: "right",
      }}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

ListSearch.propTypes = {
  list: PropTypes.array,
  setData: PropTypes.func,
  searchKey: PropTypes.string,
  setIsSearch: PropTypes.func,
};
