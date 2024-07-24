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
import { IndexTokenAbi, IndexTokenAddress } from "@/lib/contracts/IndexToken";
import { useReadContract, useWriteContract, useAccount } from "wagmi";

export function BurnIndexToken({}) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);

  const { address } = useAccount();

  const [totalINTSupply, setTotalINTSupply] = useState(0);

  const { data, isLoading } = useReadContract({
    abi: IndexTokenAbi,
    address: IndexTokenAddress,
    functionName: "totalSupply",
  });

  const { isSuccess, isPending, writeContract } = useWriteContract();

  useEffect(() => {
    console.log(data);
    if (!data) return;
    setTotalINTSupply(Number(data) / 10 ** 18);
  }, [data]);

  function handleChange(e) {
    if (e.target.value > totalINTSupply) {
      setAmount(totalINTSupply);
    } else {
      setAmount(e.target.value);
    }
  }
  function handleBurn() {
    if (amount > 0) {
      writeContract({
        address: IndexTokenAddress,
        abi: IndexTokenAbi,
        functionName: "burn",
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
          description={`Burnt ${amount} Index Tokens.`}
          handleModalClose={() => setShowModal(false)}
        />
      )}
      <CardBody className="">
        <div>
          <div className="relative">
            <label className="text-gray-800 font-semibold text-[16px] leading-[18px] ">
              Enter Burn Amount
            </label>
            <Image
              height={30}
              width={30}
              src="/int.png"
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
              onClick={() => setAmount(totalINTSupply)}
              className="absolute right-1 top-[34px] bg-white rounded-lg text-blue-600 font-bold hover:bg-blue-100 p-2 hover:rounded-lg"
            >
              MAX
            </button>
          </div>
        </div>
        <div className="flex justify-center pr-4 mt-2 text-lg">
          Total Supply : {totalINTSupply} INT
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleBurn}
          color="blue"
          className=" w-full"
          disabled={isPending}
        >
          Burn Index Tokens
        </Button>
      </CardFooter>
    </Card>
  );
}
