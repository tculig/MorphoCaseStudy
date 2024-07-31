'use client';
import type { FC } from 'react';
import { Hash } from 'viem';
import { RainbowButton } from './rainbowButton';
import Image from "next/image";
import checkIcon from "@/assets/check.svg";
import alertIcon from "@/assets/alert.svg";
import { VaultInfo } from '@/hooks/useVaultData';

interface Props {
    readonly isPending: boolean,
    readonly isSuccess: boolean,
    readonly isFailure: boolean,
    readonly className?: string,
    readonly hash: Hash | undefined,
    readonly onRetry: () => void,
    readonly onReset: () => void,
    readonly vaultData?: VaultInfo,
}

const TransactionCard: FC<Props> = ({ vaultData, isPending, isSuccess, isFailure, hash, className, onRetry, onReset }) => {

    const header = (() => {
        if (isPending) return <div className="text-sm font-normal leading-5 text-[#191D20F2]">Your transaction is pending</div>;
        if (isSuccess) return <div className="flex flex-col items-center text-[#39A699F2]">
            <Image
                src={checkIcon}
                alt="Logo"
                width={42}
                priority
            />
            <div className="pt-2 text-sm font-normal leading-5">Success!</div>
        </div>;
        if (isFailure) return <div className="flex flex-col items-center text-[#C73E59F2]">
            <Image
                src={alertIcon}
                alt="Logo"
                width={42}
                priority
            />
            <div className="pt-2 text-sm font-normal leading-5">Oh no!</div>
        </div>;
        return null;
    })();

    const text = (() => {
        if (isPending && hash) return <span>View on <a href={`https://etherscan.io/tx/${hash}`} target="_blank" className="underline">Etherscan {'->'}</a></span>
        if (isSuccess) return <span>You have received {vaultData?.formattedAssets} {vaultData?.assetSymbol}</span>
        if (isFailure) return <span>Please try again.</span>
        return null;
    })();

    const button = (() => {
        if (isPending) return <RainbowButton text="Transaction finalizing..." disabled={true} />;
        if (isSuccess) return <RainbowButton text="Reset" onClick={onReset} />;
        if (isFailure) return <RainbowButton text="Retry" onClick={onRetry} />;
        return null;
    })();

    return (
        <div className={("flex flex-col p-5 justify-center w-[350px] h-[270px] shadow-[0px_3px_12px_0px_#00000017] border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026] ").concat(className ?? '')}>
            <div className=" flex flex-col w-full items-center flex-grow pt-7">
                {header}
                <div className="pt-1 text-[11px] font-medium leading-4 text-[#191D2080]">  {text}</div>
            </div>
            <div className=" flex flex-col w-full pb-7">
                {button}
            </div>
        </div>
    )
}

export { TransactionCard };
