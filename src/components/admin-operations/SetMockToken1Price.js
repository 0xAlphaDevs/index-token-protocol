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
import { useReadContract } from "wagmi";
import { IndexTokenAbi, IndexTokenAddress } from "@/lib/contracts/IndexToken";
import { MockToken1Address } from "@/lib/contracts/MockToken1";

export function SetMockToken1Price() {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const { data, isLoading } = useReadContract({
    abi: IndexTokenAbi,
    address: IndexTokenAddress,
    functionName: "getTokenPrice",
    args: [MockToken1Address],
  });

  useEffect(() => {
    console.log(data);
    if (!data) return;
    setPrice(Number(data) / 10 ** 6);
  }, [data]);

  function handleChange(e) {
    setAmount(e.target.value);
  }

  function handleSetPrice() {
    setShowModal(true);
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

  return (
    <Card className="w-96">
      {showModal && (
        <TransactionModal
          text="Transaction Successful"
          description={`Staked ${amount} Index Token.`}
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
          variant="gradient"
          color="blue"
          fullWidth
        >
          Set Price
        </Button>
      </CardFooter>
    </Card>
  );
}
