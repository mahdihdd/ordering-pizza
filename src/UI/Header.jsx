import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/oreder/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="bg-yellow-500 uppercase px-4 py-3 border-b font-sans  border-stone-500 sm:px-6 flex items-center justify-between">
      <Link to="/" className="tracking-widest	">
        Fast React Pizza Co.{" "}
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
