'use client';
import type { Dispatch, FC, SetStateAction } from 'react';

interface Props {
    readonly inputText: string;
    readonly setInputText: Dispatch<SetStateAction<string>>;
}

const InputCard: FC<Props> = ({ inputText, setInputText }) => {
    return (
        <div className="flex flex-col p-6 justify-center w-[350px] h-40 shadow-[0px_3px_12px_0px_#00000017] mt-48 border bg-[#FAFCFF] rounded-lg border-solid border-[#191D2026]">
            <label className="text-xs font-medium leading-4 mb-2">MetaMorpho Address</label>
            <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                type="text"
                id="address"
                name="address"
                placeholder='0xabc...12345'
                className="py-1 bg-[#191D2008] rounded-md px-2 border-transparent focus:border-[#4493ED] ring-0 outline-none border border-solid" />
        </div>
    )
}

export { InputCard };


