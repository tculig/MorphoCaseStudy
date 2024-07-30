'use client';
import type { FC, PropsWithChildren } from 'react';
import { Hash } from 'viem';
import { RainbowButton } from './rainbowButton';
import Image from "next/image";
import checkIcon from "../assets/check.svg";
import alertIcon from "../assets/alert.svg";

interface Props {
    readonly isPending: boolean,
    readonly isSuccess: boolean,
    readonly isFailure: boolean,
    readonly className?: string,
    readonly hash: Hash | undefined,
    readonly onRetry: ()=>void,
    readonly onReset: ()=>void,
}

const TransactionCard: FC<PropsWithChildren<Props>> = ({ isPending, isSuccess, isFailure, hash, className, onRetry, onReset }) => {

    const header = (() => {
        if (isPending) return <div className="text-xl py-2 text-[#191D20F2] leading-6">Your transaction is pending</div>;
        if (isSuccess) return <div className="flex flex-col items-center text-[#39A699F2]">
            <Image
                src={checkIcon}
                alt="Logo"
                width={24}
                priority
            />
            Success!
        </div>;
        if (isFailure) return <div className="flex flex-col items-center text-[#C73E59F2]">
            <Image
                src={alertIcon}
                alt="Logo"
                width={24}
                priority
            />
            Oh no!
        </div>;
        return null;
    })();

    const text = (() => {
        if (isPending) return <span>View on <a href={`https://etherscan.io/tx/${hash}`} className="underline">Etherscan {'->'}</a></span>
        if (isSuccess) return <span>You have received xxxx $assetSymbol</span>
        if (isFailure) return <span>Please try again.</span>
        return null;
    })();

    const button = (() => {
        if (isPending) return <RainbowButton text="Transaction finalizing..." disabled={true} />;
        if (isSuccess) return <RainbowButton text="Reset" onClick={onReset}/>;
        if (isFailure) return <RainbowButton text="Retry" onClick={onRetry}/>;
        return null;
    })();

    return (
        <div className={("flex flex-col p-6 justify-center w-[350px] h-[270px] shadow-[0px_3px_12px_0px_#00000017] border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026] ").concat(className ?? '')}>
            <div className=" flex flex-col w-full justify-center items-center flex-grow">
                {header}
                <div className="pb-6 text-[11px] font-medium leading-4 text-[#191D2080]">  {text}</div>
            </div>
            <div className=" flex flex-col w-full pb-6">
                {button}
            </div>
        </div>
    )
}

export { TransactionCard };