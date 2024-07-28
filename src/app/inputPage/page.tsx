import { useState } from "react";
import { InputCard } from "../(components)/inputCard";
import { TopNav } from "../(components)/topNav";

export default function Home() {
  const [inputText, setInputText] = useState('');

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

