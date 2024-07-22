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

export function SetMinterAddress() {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");

  const minter = "0x23904dojvq9847r";

  function handleChange(e) {
    setAddress(e.target.value);
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
          {/* <Image
            height={30}
            width={30}
            src="/sui-icon.svg"
            className="absolute top-[14px] left-2"
            alt="icon"
          ></Image> */}
          <input
            className="p-4 bg-gray-200 rounded-[12px] border-gray-100 h-[58px] w-full font-[500] text-[16px] leading-[18px] text-gray-800"
            placeholder="Enter Minter Address"
            size="lg"
            onChange={handleChange}
            value={address}
          ></input>
        </div>
        <div className="flex justify-center pr-4 mt-2 ">
          Current Minter : {minter}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleSetPrice}
          variant="gradient"
          color="blue"
          fullWidth
        >
          Set Minter
        </Button>
      </CardFooter>
    </Card>
  );
}
