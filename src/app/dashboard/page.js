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

export default function AppPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("rebalance");
  const [token0Weight, setToken0Weight] = useState();
  const [token1Weight, setToken1Weight] = useState();
  const [unstakeAmount, setUnstakeAmount] = useState();
  const [indexTokenValue, setIndexTokenValue] = useState(140);
  const [stakedintBalance, setStakedintBalance] = useState(0);

  function getBalances() {
    // TODO: get balances from the blockchain 🟡
    return {
      indexTokenValue: 140,
      stakedintBalance: 1000,
    };
  }

  useEffect(() => {
    const { indexTokenValue, stakedintBalance } = getBalances();
    setIndexTokenValue(indexTokenValue);
    setStakedintBalance(stakedintBalance);
  }, []);

  const activeTabStyle = "bg-gray-900 text-white";
  const inactiveTabStyle = "bg-white text-black";

  return (
    <div className="bg-custom-gradient min-h-screen">
      <div className="flex justify-between px-2 sm:px-10 py-4">
        <a href="/" className="-m-1.5 p-1.5">
          <span className="text-xl font-bold">Index Token</span>
        </a>
        {/* <button className=" bg-white text-black p-3 rounded-[25px] font-bold">
          Connect wallet
        </button> */}
        <ConnectKitButton />
      </div>
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
          <Rebalance
            indexTokenValue={indexTokenValue}
            token0Weight={token0Weight}
            token1Weight={token1Weight}
            setToken0Weight={setToken0Weight}
            setToken1Weight={setToken1Weight}
          />
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
