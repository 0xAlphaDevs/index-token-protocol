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

export function DepositMockToken0({}) {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const balance = 1000;
  const allowance = 0;

  function handleChange(e) {
    if (e.target.value > balance) {
      setAmount(balance);
    } else {
      setAmount(e.target.value);
    }
  }

  function handleToken0Deposit() {
    setShowModal(true);
  }

  function handleToken0Approve() {
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
          description={`Deposited ${amount} MT0.`}
          handleModalClose={() => setShowModal(false)}
        />
      )}
      <CardBody className="">
        <div>
          <div className="relative">
            <label className="text-gray-800 font-semibold text-[16px] leading-[18px] ">
              Enter Token0 Amount
            </label>
            <Image
              height={30}
              width={30}
              src="/mt0.png"
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
              onClick={() => setAmount(balance)}
              className="absolute right-1 top-[34px] bg-white rounded-lg text-blue-600 font-bold hover:bg-blue-100 p-2 hover:rounded-lg"
            >
              MAX
            </button>
          </div>
        </div>
        <div className="flex justify-center pr-4 mt-2 text-lg">
          Balance : {balance} MT0
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        {allowance === 0 ? (
          <Button
            onClick={handleToken0Approve}
            variant="gradient"
            color="blue"
            fullWidth
          >
            Approve
          </Button>
        ) : (
          <Button
            onClick={handleToken0Deposit}
            variant="gradient"
            color="blue"
            fullWidth
          >
            Deposit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
