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

export function SetMockToken0Price() {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);

  const price = 1;

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
            src="/sui-icon.svg"
            className="absolute top-[14px] left-2"
            alt="icon"
          ></Image>
          <input
            className="pr-28 bg-gray-200 rounded-[12px] border-gray-100 h-[58px] pl-[50px] font-[500] text-[16px] leading-[18px] text-gray-800"
            placeholder="Enter Price"
            size="lg"
            onChange={handleChange}
            value={amount}
            type="number"
          ></input>
        </div>
        <div className="flex justify-center pr-4 mt-2 ">
          Token0 Price : {price} USD
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
