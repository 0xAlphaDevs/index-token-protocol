"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import FaqCard from "../../components/faq";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { SetMockToken0Price } from "@/components/SetMockToken0Price";
import { SetMockToken1Price } from "@/components/SetMockToken1Price";
import { SetMinterAddress } from "@/components/SetMinterAddress";

export default function AppPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("token0Price");
  const [stakeAmount, setStakeAmount] = useState();
  const [unstakeAmount, setUnstakeAmount] = useState();
  const [intBalance, setintBalance] = useState(0);
  const [stakedintBalance, setStakedintBalance] = useState(0);

  function getBalances() {
    // TODO: get balances from the blockchain 🟡
    return {
      intBalance: 2000,
      stakedintBalance: 1000,
    };
  }

  useEffect(() => {
    const { intBalance, stakedintBalance } = getBalances();
    setintBalance(intBalance);
    setStakedintBalance(stakedintBalance);
  }, []);

  const activeTabStyle = "bg-gray-900 text-white";
  const inactiveTabStyle = "bg-white text-black";

  return (
    <div className="bg-custom-gradient min-h-screen">
      {/* <img src="/background.jpg" className="absolute z-[-200]" /> */}
      <div className="flex justify-between px-2 sm:px-10 py-4">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="text-xl font-bold">Index Token</span>
        </a>
        <button className=" bg-white text-black p-3 rounded-[25px] font-bold">
          Connect wallet
        </button>
      </div>
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
              activeTab === "unstake" ? activeTabStyle : inactiveTabStyle
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
