import { useState, useRef } from "react"
import { data } from "../../assets/data"
const Quiz = () => {
  
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false)

  const option1 = useRef(null)
  const option2 = useRef(null)
  const option3 = useRef(null)
  const option4 = useRef(null)

  const option_array = [option1, option2, option3, option4]

  const checkAns = (e, ans)=>{
    if (lock == false) {
      if (question.ans === ans) {
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev=>prev+1)
      }
      else{
        e.target.classList.add("wrong")
        setLock(true)
        option_array[question.ans-1].current.classList.add("correct");
      }
    }
  }

  const next = () => {
  if (lock === true) {
    if (index === data.length - 1) {
      setResult(true)  
      return 0;
    }
    setIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      if(newIndex < data.length){
        setQuestion(data[newIndex]);
      }
      return newIndex;
    });
    setLock(false);

    // reset options classes
    option_array.forEach(option => {
      option.current.classList.remove("correct");
      option.current.classList.remove("wrong");
    });
  }
}

const reset =()=>{
  setIndex(0)
  setQuestion(data[0])
  setScore(0)
  setLock(false)
  setResult(false)
}

  return (
    <div className="w-[540px] bg-white text-[#262626] flex flex-col gap-[20px] rounded py-[10px] px-[20px]">
        <h1 className="text-3xl font-bold ">Quiz App</h1>
        <hr className="h-[2px] border-none bg-[#707070]"/>
        {result ? <></>:<>
           <h2 className="text-xl">
            {index + 1}. {question.question}
        </h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAns(e,1)}} className="flex items-center h-12 pl-2 border-[1px] border-gray-400 rounded mb-[20px] text-[17px] cursor-pointer mx-15">{question.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAns(e,2)}} className="flex items-center h-12 pl-2 border-[1px] border-gray-400 rounded mb-[20px] text-[17px] cursor-pointer mx-15">{question.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAns(e,3)}} className="flex items-center h-12 pl-2 border-[1px] border-gray-400 rounded mb-[20px] text-[17px] cursor-pointer mx-15">{question.option3}</li>
            <li ref={option4} onClick={(e)=>{checkAns(e,4)}} className="flex items-center h-12 pl-2 border-[1px] border-gray-400 rounded mb-[20px] text-[17px] cursor-pointer mx-15">{question.option4}</li>
        </ul>
        <button onClick={next} className="m-auto w-[150px] h-[40px] bg-[#553f9a] text-[#fff] text-[20px] rounded-xl cursor-pointer">Next</button>
        <div className="index m-auto text-[18px]">
            {index+1} of {data.length} questions
        </div>
        </>}

        {result ? <>
        <h2>You Scored {score} out of {data.length}</h2>
        <button onClick={reset} className="m-auto w-[160px] h-[50px] bg-[#553f9a] text-[#fff] text-[20px] rounded-xl cursor-pointer">Reset</button>
       </> :<></>}
        
    </div>
  )
}

export default Quiz 