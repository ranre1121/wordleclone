'use client';
import { useState, useEffect} from "react"

const Rows = ({setResetKey}) => {
  const [tries, setTries] = useState(()=>Array(5).fill(''));
  const [current, setCurrent] = useState('');
  const [counter, setCounter] = useState(0);
  const [found, setFound] = useState(false);
  const [gameOver, setGameOver]= useState(false);
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

  useEffect(()=>{
    if (counter===5 || found==true) return;

    const onKeyUp = (e) => {
        if(e.key=="Enter" && current.length===5 ){
            setCounter(c=>c+1);
            setCurrent('');
            
        }

        setCurrent((old)=>{
            if(old.length<5 &&  e.key.length===1 && e.key.match(/[a-z]/i)){
                return old+e.key
            } else if(e.key=='Backspace'){
                return old.substring(0,old.length-1)
            }
            else {
                return old
            }
        })
    }
    window.addEventListener('keydown', onKeyUp) 
    return () => window.removeEventListener('keydown', onKeyUp);
  },[current])

  useEffect(()=>{
    if (counter===5 || found==true){
        setGameOver(true);
        return
    };
    setTries(old=>{
            const newArr = [...old];
            newArr[counter] = current;
            return newArr;
    })
  },[current])

  useEffect(()=>{
    if(counter === 0 || found==true) return;
    if(counter === 5 && found === false){
        setGameOver(true);
    }
    for(let i = 0; i<5; i++){
        const letter = tries[counter-1][i]
        if (word.includes(letter)){
            if(word[i] === letter){
                document.getElementById(`box-${counter-1}-${i}`).classList.add('bg-green-600','text-white','border-black')
            }else{
            document.getElementById(`box-${counter-1}-${i}`).classList.add('bg-yellow-600', 'text-white','border-black')       
        }}else{
            document.getElementById(`box-${counter-1}-${i}`).classList.add('bg-red-600', 'text-white','border-black')  
        }
    }
    if(word===tries[counter-1]){
        setFound(true);
        setGameOver(true);
    }
  },[counter])

  const handleNewGame = () => {
    setResetKey((c)=>c===0?1:0)
  }

  return (

    <div className='flex flex-col gap-2 items-center'>        
        {tries.map((_,i)=>
        <div key={i} className="flex gap-2">
            {Array(5).fill('').map((_,index)=>
            <div key={index} id={`box-${i}-${index}`} className="box h-12 w-12 border-2 flex items-center justify-center">
                {tries[i][index]?.toUpperCase()}
            </div>)}
        </div>)}
        <p className="text-2xl">
            {found?'You win':counter===5?`You lose: ${word}`:''}
        </p>
        {gameOver?<button className="border-2 py-1 px-2 text-xl border-blue-500 bg-blue-400 cursor-pointer text-white rounded-md"
        onClick={handleNewGame}>Play again?</button>:''}
    </div>
     

  )
}

export default Rows