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

export function MintIndexToken({}) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);

  const totalMintableAmount = 1000;

  function handleChange(e) {
    if (e.target.value > totalMintableAmount) {
      setAmount(totalMintableAmount);
    } else {
      setAmount(e.target.value);
    }
  }
  function handleMint() {
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
        <div>
          <div className="relative">
            <label className="text-gray-800 font-semibold text-[16px] leading-[18px] ">
              Enter Mint Amount
            </label>
            <Image
              height={30}
              width={30}
              src="/sui-icon.svg"
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
        <Button onClick={handleMint} variant="gradient" color="blue" fullWidth>
          Mint Index Tokens
        </Button>
      </CardFooter>
    </Card>
  );
}
