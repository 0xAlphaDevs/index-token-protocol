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
import { useWriteContract } from "wagmi";
import { IndexTokenAbi, IndexTokenAddress } from "@/lib/contracts/IndexToken";
import { MockToken1Address } from "@/lib/contracts/MockToken1";
import { isAddress } from "viem";

export function SetMinterAddress() {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");

  const { isSuccess, isPending, writeContract } = useWriteContract();

  function handleChange(e) {
    setAddress(e.target.value);
  }

  function handleSetMinter() {
    if (isAddress(address)) {
      writeContract({
        address: IndexTokenAddress,
        abi: IndexTokenAbi,
        functionName: "setMinter",
        args: [address],
        chainId: 421_614,
      });
    } else {
      alert("Please enter a valid ETH address");
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
          description={`Minter address updated to ${address}.`}
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
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleSetMinter}
          color="blue"
          className=" w-full"
          disabled={isPending}
        >
          Set Minter
        </Button>
      </CardFooter>
    </Card>
  );
}
