'use client';
import type { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
    readonly icon?: ReactNode;
    readonly header?: string;
    readonly text?: string;
    readonly footer?: ReactNode;
    readonly className?: string;
}

const BoxCard: FC<PropsWithChildren<Props>> = ({ icon, header, text, footer, children, className }) => {
    return (
        <div className={("flex flex-col p-5 pb-6 justify-center text-center w-[350px] h-[350px] shadow-[0px_3px_12px_0px_#00000017] border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026] ").concat(className ?? '')}>
            <div className="w-full justify-center items-center flex-grow flex flex-col">
                {icon ? <div className="pt-14">{icon}</div> : null}
                {header ? <div className="text-xl pt-2 text-[#191D20F2]">{header}</div> : null}
                {text ? <div className="text-sm pt-2 pb-12 text-[#191D20B2] leading-5">{text}</div> : null}
                {children}
            </div>
            <div className=" flex flex-col w-full pb-14">
                {footer ?? null}
            </div>
           
        </div>
    )
}

export { BoxCard };

/*
 <div className="w-full opacity-0" style={{ height:"100%", position: "absolute", top: "6px", left: "96px", backgroundImage: "url('https://postimage.me/images/2024/07/31/m1.png')" }}>
            </div>
*/
