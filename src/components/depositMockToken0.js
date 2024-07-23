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
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { MockToken0Abi, MockToken0Address } from "@/lib/contracts/MockToken0";
import { IndexTokenAbi, IndexTokenAddress } from "@/lib/contracts/IndexToken";

export function DepositMockToken0({}) {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const { address } = useAccount();

  const { data: allowance } = useReadContract({
    abi: MockToken0Abi,
    address: MockToken0Address,
    functionName: "allowance",
    args: [address, IndexTokenAddress],
  });

  const { data: balance } = useReadContract({
    abi: MockToken0Abi,
    address: MockToken0Address,
    functionName: "balanceOf",
    args: [address],
  });

  const {
    isSuccess: isApproveSuccess,
    isPending: isApprovePending,
    writeContract: writeApproveContract,
  } = useWriteContract();
  const {
    isSuccess: isDepositSuccess,
    isPending: isDepositPending,
    writeContract: writeDepositContract,
  } = useWriteContract();

  function handleChange(e) {
    if (e.target.value > Number(balance) / 10 ** 18) {
      setAmount(Number(balance) / 10 ** 18);
    } else {
      setAmount(e.target.value);
    }
  }

  function handleToken0Deposit() {
    if (amount > 0) {
      writeDepositContract({
        address: IndexTokenAddress,
        abi: IndexTokenAbi,
        functionName: "depositReserveTokens",
        args: [MockToken0Address, BigInt(amount * 10 ** 18)],
        chainId: 421_614,
      });
    } else {
      alert("Please enter a valid amount");
    }
  }

  function handleToken0Approve() {
    if (amount > 0) {
      writeApproveContract({
        address: MockToken0Address,
        abi: MockToken0Abi,
        functionName: "approve",
        args: [IndexTokenAddress, BigInt(amount * 10 ** 18)],
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
        setShowDepositModal(false);
        setShowApproveModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isApproveSuccess) {
      setShowApproveModal(true);
    }
  }, [isApproveSuccess]);

  useEffect(() => {
    if (isDepositSuccess) {
      setShowDepositModal(true);
    }
  }, [isDepositSuccess]);

  return (
    <Card className="w-96">
      {showApproveModal && (
        <TransactionModal
          text="Transaction Successful"
          description={`Approved ${amount} MT0.`}
          handleModalClose={() => setShowApproveModal(false)}
        />
      )}
      {showDepositModal && (
        <TransactionModal
          text="Transaction Successful"
          description={`Deposited ${amount} MT0.`}
          handleModalClose={() => setShowDepositModal(false)}
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
              onClick={() => setAmount(Number(balance) / 10 ** 18)}
              className="absolute right-1 top-[34px] bg-white rounded-lg text-blue-600 font-bold hover:bg-blue-100 p-2 hover:rounded-lg"
            >
              MAX
            </button>
          </div>
        </div>
        <div className="flex justify-center pr-4 mt-2 text-lg">
          Balance : {Number(balance) / 10 ** 18} MT0
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        {Number(allowance) / 10 ** 18 === 0 ? (
          <Button
            onClick={handleToken0Approve}
            color="blue"
            className=" w-full"
            disabled={isApprovePending}
          >
            Approve
          </Button>
        ) : (
          <Button
            onClick={handleToken0Deposit}
            color="blue"
            className=" w-full"
            disabled={isDepositPending}
          >
            Deposit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
