import { useState } from "react";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="hidden md:flex md:border-r md:border-slate-500 md:p-4 md:flex-col bg-white md:max-w-xs">
      <SearchInput setSearch={setSearch} />
      <div className="divider px-3"></div>
      <Conversations search={search} />
    </div>
  );
};

export default Sidebar;
