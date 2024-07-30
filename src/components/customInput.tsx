'use client';
import type { Dispatch, FC, SetStateAction } from 'react';
import checkIcon from "../assets/check.svg";
import alertIcon from "../assets/alert.svg";
import Image from "next/image";

export interface InputProps {
    readonly inputText: string;
    readonly setInputText: Dispatch<SetStateAction<string>>;
    readonly isValid: boolean;
    readonly isInvalid: boolean;
}

const CustomInput: FC<InputProps> = ({ inputText, setInputText, isValid, isInvalid }) => {
    return (
        <div>
            <div className="flex w-full bg-[#191D2008] rounded-md px-2 border-transparent focus-within:border-[#4493ED] border border-solid">
                <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    type="text"
                    id="address"
                    name="address"
                    placeholder='0xabc...12345'
                    className={("w-full overflow-hidden text-ellipsis py-1 ring-0 outline-none bg-transparent ").concat(isInvalid ? "text-[#C73E59]" : "")} />
                {isValid ? <Image
                    src={checkIcon}
                    alt="Logo"
                    width={24}
                    priority
                /> : null}
                {isInvalid ? <Image
                    src={alertIcon}
                    alt="Logo"
                    width={24}
                    priority
                /> : null}
            </div>
            {isInvalid ?
                (<div className="text-[#C73E59] text-right text-[13px] font-normal leading-5 py-1">Input is not an address</div>)
                : null}
        </div>
    )
}

export { CustomInput };



