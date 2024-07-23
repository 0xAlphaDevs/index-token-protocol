"use client";
import { Rebalance, Stake } from "../../components/rebalance";
import { DepositMockToken0 } from "../../components/depositMockToken0";
import { DepositMockToken1 } from "../../components/depositMockToken1";
import { useEffect, useState } from "react";
import Image from "next/image";
import FaqCard from "../../components/faq";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { MintIndexToken } from "@/components/mintIndexToken";
import { BurnIndexToken } from "@/components/burnIndexToken";
import { ConnectKitButton } from "connectkit";
import Navbar from "@/components/navbar";

export default function AppPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("rebalance");

  const activeTabStyle = "bg-gray-900 text-white";
  const inactiveTabStyle = "bg-white text-black";

  return (
    <div className="bg-custom-gradient min-h-screen">
      <Navbar />
      <div className="text-center pt-5 font-bold text-white text-[60px]">
        {" "}
        Index Token
      </div>
      <div className="text-center  font-bold text-white text-[24px]">
        {" "}
        Perform operations on your Index Token.
      </div>
      <div className="flex flex-col justify-center items-center pt-5 ">
        <div className="flex justify-between " size="lg" fullWidth>
          <button
            onClick={() => setActiveTab("rebalance")}
            className={`${
              activeTab === "rebalance" ? activeTabStyle : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Rebalance
          </button>
          <button
            onClick={() => setActiveTab("depositMockToken0")}
            className={`${
              activeTab === "depositMockToken0"
                ? activeTabStyle
                : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Deposit Token0
          </button>
          <button
            onClick={() => setActiveTab("depositMockToken1")}
            className={`${
              activeTab === "depositMockToken1"
                ? activeTabStyle
                : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Deposit Token1
          </button>
          <button
            onClick={() => setActiveTab("mint")}
            className={`${
              activeTab === "mint" ? activeTabStyle : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Mint
          </button>
          <button
            onClick={() => setActiveTab("burn")}
            className={`${
              activeTab === "burn" ? activeTabStyle : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Burn
          </button>
        </div>
        {activeTab == "rebalance" ? (
          <Rebalance />
        ) : activeTab == "depositMockToken0" ? (
          <DepositMockToken0 />
        ) : activeTab == "depositMockToken1" ? (
          <DepositMockToken1 />
        ) : activeTab == "mint" ? (
          <MintIndexToken />
        ) : activeTab == "burn" ? (
          <BurnIndexToken />
        ) : null}
      </div>
      <div className="flex  justify-center items-center">
        <button
          onClick={() => router.push("/mock-tokens")}
          className={` m-4 py-3 px-14 rounded-full bg-gray-200 shadow-none hover:bg-gray-100`}
        >
          Get Mock Tokens
        </button>

        <button
          onClick={() => router.push("/admin-operations")}
          className={` m-4 py-3 px-14 rounded-full bg-gray-200 shadow-none hover:bg-gray-100`}
        >
          Admin Operations
        </button>
      </div>
    </div>
  );
}
