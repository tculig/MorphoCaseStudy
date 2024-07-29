'use client';
import type { FC, ReactNode } from 'react';

interface Props {
    readonly icon?: ReactNode;
    readonly header?: string;
    readonly text?: string;
    readonly button?: ReactNode;
}

const BoxCard: FC<Props> = ({ icon, header, text, button }) => {
    return (
        <div className="flex flex-col p-6 justify-center text-center items-center w-[350px] h-[350px] shadow-[0px_3px_12px_0px_#00000017] mt-64 border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026]">
            {icon ?? null}
            {header ? <div className="text-xl py-2 text-[#191D20F2]">{header}</div> : null}
            {text ? <div className="text-sm pb-12 text-[#191D20B2]">{text}</div> : null}
            {button ?? null}
        </div>
    )
}

export { BoxCard };


