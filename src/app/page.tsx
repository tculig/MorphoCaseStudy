import { InputCard } from "./components/inputCard";
import { TopNav } from "./components/topNav";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center bg-[#F0F2F7]">
      <TopNav/>
      <InputCard/>
    </main>
  );
}

