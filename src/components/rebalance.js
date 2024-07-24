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
import { TransactionModal } from "./modal";
import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { IndexTokenAbi, IndexTokenAddress } from "@/lib/contracts/IndexToken";

export function Rebalance({}) {
  const [showModal, setShowModal] = useState(false);
  const [currentToken0Weight, setCurrentToken0Weight] = useState(50);
  const [currentToken1Weight, setCurrentToken1Weight] = useState(50);
  const [token0Weight, setToken0Weight] = useState();
  const [token1Weight, setToken1Weight] = useState();
  const [indexTokenValue, setIndexTokenValue] = useState(0);

  const { data: data0 } = useReadContract({
    abi: IndexTokenAbi,
    address: IndexTokenAddress,
    functionName: "token0Weight",
  });

  const { data: data1 } = useReadContract({
    abi: IndexTokenAbi,
    address: IndexTokenAddress,
    functionName: "token1Weight",
  });

  const { data: intValue } = useReadContract({
    abi: IndexTokenAbi,
    address: IndexTokenAddress,
    functionName: "calculateIndexTokenValue",
  });

  const { isSuccess, isPending, writeContract } = useWriteContract();

  useEffect(() => {
    if (!data0 || !data1) return;
    else {
      setCurrentToken0Weight(data0);
      setCurrentToken1Weight(data1);
      setIndexTokenValue(Number(intValue) / 10 ** 6);
    }
  }, [data0, data1, intValue]);

  function handleToken0Weight(e) {
    if (e.target.value > 100) {
      setToken0Weight(100);
      setToken1Weight(0);
    } else {
      setToken0Weight(e.target.value);
      setToken1Weight(100 - e.target.value);
    }
  }
  function handleToken1Weight(e) {
    if (e.target.value > 100) {
      setToken1Weight(100);
      setToken0Weight(0);
    } else {
      setToken1Weight(e.target.value);
      setToken0Weight(100 - e.target.value);
    }
  }
  function handleRebalance() {
    if (token0Weight > 0 && token1Weight > 0) {
      writeContract({
        address: IndexTokenAddress,
        abi: IndexTokenAbi,
        functionName: "rebalance",
        args: [BigInt(token0Weight), BigInt(token1Weight)],
      });
    } else {
      alert("Please enter valid weights");
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
          description={`Index Token Rebalanced successfully.`}
          handleModalClose={() => setShowModal(false)}
        />
      )}
      <CardBody className="">
        <div>
          <div className="relative">
            <label className="text-gray-800 font-semibold text-[16px] leading-[18px] ">
              Enter Token0 Weight
            </label>

            <input
              className="p-4 bg-gray-200 rounded-[12px] border-gray-100 h-[58px] w-full font-[500] text-[16px] leading-[18px] text-gray-800"
              placeholder="Index Token Amount"
              size="lg"
              onChange={handleToken0Weight}
              value={token0Weight}
              type="number"
            ></input>
          </div>

          <div className="relative mt-4">
            <label className="text-gray-800 font-semibold text-[16px] leading-[18px] ">
              Enter Token1 Weight
            </label>

            <input
              className="p-4 bg-gray-200 rounded-[12px] border-gray-100 h-[58px] w-full font-[500] text-[16px] leading-[18px] text-gray-800"
              placeholder="Index Token Amount"
              size="lg"
              onChange={handleToken1Weight}
              value={token1Weight}
              type="number"
            ></input>
          </div>
        </div>
        <div className="flex justify-center pr-4 mt-2 text-lg">
          Token0 Weight : {currentToken0Weight} %
        </div>
        <div className="flex justify-center pr-4 mt-2 text-lg">
          Token1 Weight : {currentToken1Weight} %
        </div>
        <div className="flex justify-center pr-4 mt-2 text-lg">
          Index Token value : {indexTokenValue} USD
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleRebalance}
          color="blue"
          className=" w-full"
          disabled={isPending}
        >
          Rebalance Token Weights
        </Button>
      </CardFooter>
    </Card>
  );
}
