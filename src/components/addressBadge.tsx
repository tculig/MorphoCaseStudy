'use client';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import type { FC } from 'react';

interface Props {
    readonly address: string | undefined;
    readonly semaforColorClassName?: string;
}

const AddressBadge: FC<Props> = ({ address, semaforColorClassName = "bg-[linear-gradient(180deg,#A3C3FF_0%,#2470FF_100%)]" }) => {
    const { open } = useWeb3Modal();
    
    const semafor = (
        <div className="h-5 w-5 rounded-[50%] border-2 border-solid border-[#191D200D] flex items-center">
            <div className={("h-3.5 w-3.5 rounded-[50%] m-auto ").concat(semaforColorClassName ?? '')} />
        </div>);
    return (
        <button className="flex w-[110px] h-[26px] rounded-[3px] bg-[#191D200F] items-center p-1" onClick={()=>open()}>
            {semafor}
            <div className="pl-1 text-[11px] font-medium leading-4 overflow-hidden text-ellipsis">{address}</div>
            <div className="pr-1 text-[11px] font-medium leading-4">{address ? address.substring(address.length - 4) : "0x0"}</div>
        </button>
    )
}
export { AddressBadge };


