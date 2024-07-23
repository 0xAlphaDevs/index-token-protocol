"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import { TransactionModal } from "../modal";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { MockToken1Abi, MockToken1Address } from "@/lib/contracts/MockToken1";

export function MintToken1({}) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();

  const { data, isLoading } = useReadContract({
    abi: MockToken1Abi,
    address: MockToken1Address,
    functionName: "balanceOf",
    args: [address],
  });

  const { isPending, isSuccess, writeContract } = useWriteContract();

  useEffect(() => {
    console.log(data);
    if (!data) return;
    setBalance(Number(data) / 10 ** 18);
  }, [data]);

  function handleChange(e) {
    if (e.target.value > 1000) {
      setAmount(1000);
    } else setAmount(e.target.value);
  }

  function handleMint() {
    if (amount > 0) {
      writeContract({
        abi: MockToken1Abi,
        address: MockToken1Address,
        functionName: "mint",
        args: [address, BigInt(amount * 10 ** 18)],
      });
    } else {
      alert("Please enter a valid amount");
    }
  }

  // close modal when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.className.includes("backdrop-blur-sm")) {
        setShowModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setShowModal(true);
    }
  }, [isSuccess]);

  return (
    <Card className="w-96">
      {showModal && (
        <TransactionModal
          text="Transaction Successful"
          description={`Minted ${amount} Mock Token 1.`}
          handleModalClose={() => setShowModal(false)}
        />
      )}
      <CardBody className="">
        <div className="relative">
          <label className="text-gray-800 font-semibold text-[16px] leading-[18px] ">
            Enter Token1 Amount
          </label>
          <Image
            height={30}
            width={30}
            src="/mt1.png"
            className="absolute top-[39px] left-2"
            alt="icon"
          ></Image>
          <input
            className="p-4 pl-12 bg-gray-200 rounded-[12px] border-gray-100 h-[58px] w-full font-[500] text-[16px] leading-[18px] text-gray-800"
            placeholder="Index Token Amount"
            size="lg"
            onChange={handleChange}
            value={amount}
            type="number"
          ></input>
          <button
            onClick={() => setAmount(1000)}
            className="absolute right-1 top-[34px] bg-white rounded-lg text-blue-600 font-bold hover:bg-blue-100 p-2 hover:rounded-lg"
          >
            MAX
          </button>
        </div>
        <div className="flex justify-end pr-4 mt-2 font-semibold">
          Balance : {balance.toFixed(3)} MT1
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleMint}
          color="blue"
          className="w-full"
          disabled={isPending}
        >
          Mint
        </Button>
      </CardFooter>
    </Card>
  );
}
