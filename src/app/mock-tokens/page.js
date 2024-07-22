"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import FaqCard from "../../components/faq";
import Footer from "@/components/footer";
import { MintToken0 } from "@/components/mintToken0";
import { MintToken1 } from "@/components/mintToken1";
import { useRouter } from "next/navigation";
import { ConnectKitButton } from "connectkit";
import Navbar from "@/components/navbar";

export default function AppPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("stake");
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
      <Navbar />
      <div className="text-center pt-5 font-bold text-white text-[60px]">
        {" "}
        Mint Mock tokens
      </div>
      <div className="text-center  font-bold text-white text-[24px]">
        {" "}
        You can mint mock tokens to deposit as reserves to mint index tokens.
        <br />
        ⚠️ ONLY FOR TESTING PURPOSES ⚠️
      </div>
      <div className="flex flex-col justify-center items-center pt-5 ">
        <div className="flex justify-between w-96" size="lg" fullWidth>
          <button
            onClick={() => setActiveTab("stake")}
            className={`${
              activeTab === "stake" ? activeTabStyle : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Token0
          </button>
          <button
            onClick={() => setActiveTab("unstake")}
            className={`${
              activeTab === "unstake" ? activeTabStyle : inactiveTabStyle
            } m-4 py-3 px-14 rounded-2xl border-gray-900  shadow-none hover:bg-gray-900 hover:text-white`}
          >
            Token1
          </button>
        </div>
        {activeTab == "stake" ? (
          <MintToken0
          // balance={intBalance}
          // amount={stakeAmount}
          // setAmount={setStakeAmount}
          />
        ) : (
          <MintToken1
          // balance={stakedintBalance}
          // amount={unstakeAmount}
          // setAmount={setUnstakeAmount}
          />
        )}
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
