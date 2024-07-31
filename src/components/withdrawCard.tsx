'use client';
import type { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
    readonly header?: string;
    readonly text?: string;
    readonly footer?: ReactNode;
    readonly className?: string;
}

const WithdrawCard: FC<PropsWithChildren<Props>> = ({ header, text, footer, children, className }) => {
    return (
        <div className={("flex flex-col p-5 pb-6 w-[350px] h-[320px] shadow-[0px_3px_12px_0px_#00000017] border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026] ").concat(className ?? '')}>
            <div className="w-full flex-grow flex flex-col">
                {header ? <div className="text-xl pt-6 text-[#191D20F2] leading-8">{header}</div> : null}
                {text ? <div className="text-sm pt-2 pb-12 text-[#191D20B2] leading-5">{text}</div> : null}
                {children}
            </div>
            <div className=" flex flex-col w-full pb-6">
                {footer ?? null}
            </div>
        </div>
    )
}

export { WithdrawCard };

/*
 <div className="w-full opacity-0" style={{ height:"100%", position: "absolute", top: "6px", left: "96px", backgroundImage: "url('https://postimage.me/images/2024/07/31/withdraw01.png')" }}>
            </div>
*/
