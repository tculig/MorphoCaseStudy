'use client';

import { useEffect, useState } from "react";
import { InputCard } from "../../components/inputCard";
import { TopNav } from "../../components/topNav";
import metaMorphoAbi from "../../abi/metaMorphoFactory.json";
import { useReadContract } from "wagmi";
import { useDebounce } from "use-debounce";

export default function InputPage() {
  const [inputText, setInputText] = useState('0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB');
  const [inputDebounced] = useDebounce(inputText, 500);
  const { data, isError, isLoading } = useReadContract({
    abi: metaMorphoAbi,
    address: '0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101',
    functionName: 'isMetaMorpho',
    args: [inputDebounced]
  })

  return (
    <main className="flex flex-col min-h-screen items-center bg-[#F0F2F7]">
      <TopNav />
      <InputCard
        inputText={inputText}
        setInputText={setInputText}
      />
    </main>
  );
}

