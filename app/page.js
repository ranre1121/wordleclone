'use client';

import Image from "next/image";
import Rows from "./components/Rows";
import { useState,useEffect } from "react";

export default function Home() {
  
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex items-center justify-center flex-col gap-3 h-[100vh]">
      <h1 className="text-4xl font-bold">YernaRDLE</h1>
      <p className="text-2xl">Guess the 5 letter word</p>
      <Rows key={resetKey} setResetKey={setResetKey}/>
    </div>
  );
}
