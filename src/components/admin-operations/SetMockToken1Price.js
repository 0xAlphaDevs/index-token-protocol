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
import { useReadContract, useAccount, useWriteContract } from "wagmi";
import { IndexTokenAbi, IndexTokenAddress } from "@/lib/contracts/IndexToken";
import { MockToken1Address } from "@/lib/contracts/MockToken1";

export function SetMockToken1Price() {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const { address } = useAccount();

  const { data, isLoading } = useReadContract({
    abi: IndexTokenAbi,
    address: IndexTokenAddress,
    functionName: "getTokenPrice",
    args: [MockToken1Address],
  });

  const { isSuccess, isPending, writeContract } = useWriteContract();

  useEffect(() => {
    console.log(data);
    if (!data) return;
    setPrice(Number(data) / 10 ** 6);
  }, [data]);

  function handleChange(e) {
    setAmount(e.target.value);
  }

  function handleSetPrice() {
    if (amount > 0) {
      console.log(address, amount);
      writeContract({
        address: IndexTokenAddress,
        abi: IndexTokenAbi,
        functionName: "setMockTokenPrice",
        args: [MockToken1Address, BigInt(amount * 10 ** 6)],
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
          description={`Updated Price of MT1 to ${amount} USD.`}
          handleModalClose={() => setShowModal(false)}
        />
      )}
      <CardBody className="">
        <div className="relative">
          <Image
            height={30}
            width={30}
            src="/mt1.png"
            className="absolute top-[14px] left-2"
            alt="icon"
          ></Image>
          <input
            className="p-4 pl-12 bg-gray-200 rounded-[12px] border-gray-100 h-[58px] w-full font-[500] text-[16px] leading-[18px] text-gray-800"
            placeholder="Enter Price"
            size="lg"
            onChange={handleChange}
            value={amount}
            type="number"
          ></input>
        </div>
        <div className="flex justify-center pr-4 mt-2 ">
          Token1 Price : {price} USD
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleSetPrice}
          color="blue"
          className=" w-full"
          disabled={isPending}
        >
          Set Price
        </Button>
      </CardFooter>
    </Card>
  );
}
