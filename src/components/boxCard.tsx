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
        <div className={("flex flex-col p-6 justify-center w-[350px] h-[350px] shadow-[0px_3px_12px_0px_#00000017] border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026] ").concat(className??'')}>
            {icon ?? null}
            {header ? <div className="text-xl py-2 text-[#191D20F2] leading-6">{header}</div> : null}
            {text ? <div className="text-sm pb-12 text-[#191D20B2]">{text}</div> : null}
            {children}
            {footer ?? null}
        </div>
    )
}

export { BoxCard };


