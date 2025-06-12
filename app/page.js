'use client';

import Image from "next/image";
import Rows from "./components/Rows";
import { useState,useEffect } from "react";

export default function Home() {
  const [word, setWord] = useState('');

  const words = [
  "enjoy", "dream", "dance", "catch", "carry", "bring", "below", "again", "after", "about",
  "might", "light", "known", "judge", "inner", "house", "heart", "happy", "front", "first",
  "think", "sugar", "round", "right", "quick", "place", "party", "night", "movie", "money",
  "table", "field", "earth", "other", "every", "world", "where", "water", "those", "these",
  "chart", "voice", "flour", "smile", "green", "black", "laugh", "brown", "white", "young",
  "apple", "speak", "fruit", "teach", "lemon", "smoke", "sleep", "drink", "spice", "learn",
  "dairy", "bacon", "candy", "cream", "honey", "nurse", "bread", "pizza", "mango", "river",
  "dunes", "coast", "frost", "creek", "hills", "plain", "ocean", "beach", "woods", "marsh",
  "gauge", "stone", "brick", "rotor", "metal", "glass", "steel", "major", "minor", "valve",
  "chain", "chair", "blade", "panel", "ropes", "press", "lever", "power", "cable", "wheel"
];

  
  useEffect(()=>{
    setWord(words[Math.floor(Math.random()*words.length)])
  },[])

  return (
    <div className="flex items-center justify-center flex-col gap-3 h-[100vh]">
      <h1 className="text-4xl font-bold">YernaRDLE</h1>
      <p className="text-2xl">Guess the 5 letter word</p>
      <Rows word={word}/>
    </div>
  );
}
