'use client';
import { useState, useEffect} from "react"

const Row = ({word, setWord}) => {
  const [tries, setTries] = useState(()=>Array(5).fill(''));
  const [current, setCurrent] = useState('');
  const [counter, setCounter] = useState(0);
  const [found, setFound] = useState(false);
  
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
    window.addEventListener('keyup', onKeyUp) 
    return () => window.removeEventListener('keyup', onKeyUp);
  },[current])

  useEffect(()=>{
    if (counter===5 || found==true) return;
    setTries(old=>{
            const newArr = [...old];
            newArr[counter] = current;
            return newArr;
    })
  },[current])

  useEffect(()=>{
    if(counter === 0 || found==true) return;
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
    }
  },[counter])

  return (

    <div className='flex flex-col gap-2 items-center'>        
        {tries.map((_,i)=>
        <div key={i} className="flex gap-2">
            {Array(5).fill('').map((_,index)=>
            <div key={index} id={`box-${i}-${index}`} className="h-12 w-12 border-2 flex items-center justify-center">
                {tries[i][index]?.toUpperCase()}
            </div>)}
        </div>)}
        <p className="text-2xl">
            {found?'You win':counter===5?'You lose':''}
            
        </p>
        {word}
    </div>
     

  )
}

export default Row