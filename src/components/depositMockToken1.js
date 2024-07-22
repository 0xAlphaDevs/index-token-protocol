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

export function DepositMockToken1({
  indexTokenValue,
  token0Weight,
  token1Weight,
  setToken0Weight,
  setToken1Weight,
}) {
  const [showModal, setShowModal] = useState(false);
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
              Enter Token1 Amount
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
              onChange={handleToken0Weight}
              value={token0Weight}
            ></input>
            {/* <button
              onClick={() => setAmount(balance)}
              className="absolute right-0 top-[40px] text-blue-600 font-bold hover:bg-blue-100 p-2 hover:rounded-lg"
            >
              MAX
            </button> */}
          </div>
        </div>
        <div className="flex justify-center pr-4 mt-2 text-lg">
          Balance : {indexTokenValue} MT1
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleRebalance}
          variant="gradient"
          color="blue"
          fullWidth
        >
          Rebalance Token Weights
        </Button>
      </CardFooter>
    </Card>
  );
}
