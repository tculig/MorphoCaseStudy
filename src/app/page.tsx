'use client';

import { useAccount } from "wagmi";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {

  const { address } = useAccount();

  useEffect(()=>{
    address ? redirect(`/inputPage`) : redirect(`/connectPage`)
  }, [address])

  return null;
}

