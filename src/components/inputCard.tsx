'use client';
import type { FC } from 'react';
import { CustomInput, InputProps } from './customInput';

const InputCard: FC<InputProps> = (props) => {
    return (
        <div className="flex flex-col p-6 justify-center w-[350px] h-40 shadow-[0px_3px_12px_0px_#00000017] mt-48 border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026]">
            <label className="text-xs font-medium leading-4 mb-2">MetaMorpho Address</label>
            <CustomInput {...props} />
        </div>
    )
}

export { InputCard };


