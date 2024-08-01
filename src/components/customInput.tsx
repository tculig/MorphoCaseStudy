'use client';
import type { Dispatch, FC, SetStateAction } from 'react';
import checkIcon from "../assets/check.svg";
import alertIcon from "../assets/alert.svg";
import spinnerIcon from "../assets/spinner.gif";
import Image from "next/image";

export interface InputProps {
    readonly inputText: string;
    readonly setInputText: Dispatch<SetStateAction<string>>;
    readonly isValid: boolean;
    readonly isInvalid: boolean;
    readonly isFetching: boolean;
    readonly isNotVault: boolean;
}

const CustomInput: FC<InputProps> = ({ inputText, setInputText, isValid, isInvalid, isFetching, isNotVault }) => {

    const getIcon = () => {
        if (isFetching)
            return <Image
                src={spinnerIcon}
                alt="spinner"
                className="my-2 mx-1"
                width={16}
                height={16}
                priority
            />;
        if (isValid)
            return <Image
                src={checkIcon}
                alt="check"
                width={24}
                height={24}
                priority
            />;
        if (isInvalid || isNotVault)
            return <Image
                src={alertIcon}
                alt="alert"
                width={24}
                height={24}
                priority
            />
        return null;
    };

    const getText = () => {
        if (isInvalid)
            return <div className="text-[#C73E59] text-right text-[13px] font-normal leading-5 py-1">Input is not an address</div>
        if (!isInvalid && isNotVault)
            return <div className="text-[#C73E59] text-right text-[13px] font-normal leading-5 py-1">Input is not a vault</div>
        return null;
    };

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
                    className={("w-full overflow-hidden text-ellipsis py-1 mr-1 ring-0 outline-none bg-transparent ").concat(isInvalid ? "text-[#C73E59]" : "")} />
                {getIcon()}
            </div>
            {getText()}

        </div>
    )
}

export { CustomInput };



