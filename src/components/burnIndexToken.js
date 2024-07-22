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

export function BurnIndexToken({}) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);

  const totalINTSupply = 9990;

  function handleChange(e) {
    if (e.target.value > totalINTSupply) {
      setAmount(totalINTSupply);
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
              src="/sui-icon.svg"
              className="absolute top-[46px] left-2"
              alt="icon"
            ></Image>
            <input
              className="pr-28 bg-gray-200 rounded-[12px] border-gray-100 h-[58px] pl-[50px] font-[500] text-[16px] leading-[18px] text-gray-800 mt-2"
              placeholder="Index Token Amount"
              size="lg"
              onChange={handleChange}
              value={amount}
              type="number"
            ></input>
            <button
              onClick={() => setAmount(totalINTSupply)}
              className="absolute right-0 top-[40px] text-blue-600 font-bold hover:bg-blue-100 p-2 hover:rounded-lg"
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
        <Button onClick={handleMint} variant="gradient" color="blue" fullWidth>
          Burn Index Tokens
        </Button>
      </CardFooter>
    </Card>
  );
}
