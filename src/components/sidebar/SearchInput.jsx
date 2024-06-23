import { useMemo } from "react";
import { IoSearchSharp } from "react-icons/io5";
import UserMenu from "./UserMenu";

const SearchInput = ({ setSearch }) => {
  const debouncedSearch = useMemo(() => {
    let timeoutId;
    return (value) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setSearch(value), 300);
    };
  }, [setSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-row gap-4">
      <UserMenu />
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-1 border rounded-full bg-white shadow"
      >
        <div className="pl-2">
          <IoSearchSharp className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="flex-1 p-1 bg-transparent focus:outline-none rounded-full"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchInput;
