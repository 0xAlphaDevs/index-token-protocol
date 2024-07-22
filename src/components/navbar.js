"use client";

import React from "react";
import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  return (
    <div className="flex justify-between px-2 sm:px-10 py-4">
      <a href="/" className="-m-1.5 p-1.5">
        <span className="text-xl font-bold">Index Token</span>
      </a>
      <ConnectKitButton />
    </div>
  );
};

export default Navbar;
