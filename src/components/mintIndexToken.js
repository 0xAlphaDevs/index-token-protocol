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
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export function MintIndexToken({}) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [totalMintableAmount, setTotalMintableAmount] = useState(0);

  const { address } = useAccount();

  const { data, isLoading } = useReadContract({
    abi: IndexTokenAbi,
    address: IndexTokenAddress,
    functionName: "getTotalMintableINT",
  });

  const { isSuccess, isPending, writeContract } = useWriteContract();

  useEffect(() => {
    console.log(data);
    if (!data) return;
    setTotalMintableAmount(Number(data) / 10 ** 18);
  }, [data]);

  function handleChange(e) {
    if (e.target.value > totalMintableAmount) {
      setAmount(totalMintableAmount);
    } else {
      setAmount(e.target.value);
    }
  }
  function handleMint() {
    if (amount > 0) {
      writeContract({
        address: IndexTokenAddress,
        abi: IndexTokenAbi,
        functionName: "mint",
        args: [address, BigInt(amount * 10 ** 18)],
        chainId: 421_614,
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
          description={`Minted ${amount} Index Tokens.`}
          handleModalClose={() => setShowModal(false)}
        />
      )}
      <CardBody className="">
        <div>
          <div className="relative">
            <label className="text-gray-800 font-semibold text-[16px] leading-[18px] ">
              Enter Mint Amount
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
              onClick={() => setAmount(totalMintableAmount)}
              className="absolute right-1 top-[34px] bg-white rounded-lg text-blue-600 font-bold hover:bg-blue-100 p-2 hover:rounded-lg"
            >
              MAX
            </button>
          </div>
        </div>
        <div className="flex justify-center pr-4 mt-2 text-lg">
          Max Mintable : {totalMintableAmount} INT
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleMint}
          color="blue"
          className=" w-full"
          disabled={isPending}
        >
          Mint Index Tokens
        </Button>
      </CardFooter>
    </Card>
  );
}
