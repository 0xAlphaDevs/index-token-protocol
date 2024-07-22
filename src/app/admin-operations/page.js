"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SetMockToken0Price } from "@/components/SetMockToken0Price";
import { SetMockToken1Price } from "@/components/SetMockToken1Price";
import { SetMinterAddress } from "@/components/SetMinterAddress";
import { ConnectKitButton } from "connectkit";
import Navbar from "@/components/navbar";

export default function AppPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("token0Price");

  useEffect(() => {}, []);

  const activeTabStyle = "bg-gray-900 text-white";
  const inactiveTabStyle = "bg-white text-black";

  return (
    <div className="bg-custom-gradient min-h-screen">
      {/* <img src="/background.jpg" className="absolute z-[-200]" /> */}
      <Navbar />
      <div className="text-center pt-5 font-bold text-white text-[60px]">
        {" "}
        Admin Operations
      </div>
      <div className="text-center  font-bold text-white text-[24px]">
        {" "}
        You can set price of Mock Tokens here and update the minter address.
        <br />
        ⚠️ ONLY FOR TESTING PURPOSES ⚠️
      </div>
      <div className="flex flex-col justify-center items-center pt-5 ">
        <div className="flex justify-between" size="lg" fullWidth>
          <button
            onClick={() => setActiveTab("token0Price")}
            className={`${
              activeTab === "token0Price" ? activeTabStyle : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Set Token0 Price
          </button>
          <button
            onClick={() => setActiveTab("token1Price")}
            className={`${
              activeTab === "token1Price" ? activeTabStyle : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Set Token1 Price
          </button>
          <button
            onClick={() => setActiveTab("minter")}
            className={`${
              activeTab === "minter" ? activeTabStyle : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Set Minter Address
          </button>
        </div>
        {activeTab == "token0Price" ? (
          <SetMockToken0Price />
        ) : activeTab == "token1Price" ? (
          <SetMockToken1Price />
        ) : activeTab == "minter" ? (
          <SetMinterAddress />
        ) : null}
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={() => router.push("/dashboard")}
          className={` m-4 py-3 px-14 rounded-full bg-gray-200 shadow-none hover:bg-gray-100`}
        >
          Go Back to Dashboard
        </button>
      </div>
      <br />
    </div>
  );
}
