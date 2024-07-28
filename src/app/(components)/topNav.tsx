import type { FC, ReactNode } from 'react';
import Image from "next/image";
import lightIcon from "../../assets/light.svg";
import { AddressBadge } from './addressBadge';

interface Props {
    readonly address?: string;
}

const TopNav: FC<Props> = ({ address = "0x0123456789123" }) => {
    return (
        <div className="flex justify-between h-12 border-b w-full items-center px-10">
            <div className="flex items-center">
                <Image
                    src={lightIcon}
                    alt="Logo"
                    width={24}
                    priority
                />
                <div className="text-[13px] font-normal leading-4 text-center text-[#191D20F2] px-8">Morpho Test</div>
            </div>
            <AddressBadge
                address={address}
            />
        </div>
    )
}

export { TopNav };


