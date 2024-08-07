'use client';

import { useWeb3ModalState } from "@web3modal/wagmi/react";
import { usePathname, useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";
import { useAccount } from "wagmi";

const GlobalClientCode: FC<PropsWithChildren> = ({ children }) => {
    const { selectedNetworkId } = useWeb3ModalState();
    const { address } = useAccount();
    const pathname = usePathname();
    const router = useRouter();
    const isWrongNetwork = address && (selectedNetworkId as string) != "1";

    useEffect(() => {
        if (isWrongNetwork && pathname!="/connectPage") router.push(`/connectPage`);
    }, [isWrongNetwork, pathname, router])

    return <>{children}</>
}

export { GlobalClientCode }