"use client";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white p-8">
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2024 by{" "}
        <a
          className="underline"
          href="https://github.com/mr-harshtyagi"
          target="__blank"
        >
          mr-harshtyagi
        </a>
        . All rights reserved.
      </Typography>
    </footer>
  );
}
