import { useState,useCallback,useEffect,useRef} from 'react'

function App() {
  const [length,setLength] = useState(16)
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnopqrstuvwxyz"

    if(numAllowed){
      str+="0123456789"
    }
    if(charAllowed){
      str+="@#$%&"
    }

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numAllowed,charAllowed,setPassword])
  useEffect(()=>{
    passwordGenerator()
  },[length,numAllowed,charAllowed,passwordGenerator])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  const copyText=()=>{
    const text = document.createElement('h3')
    text.textContent = 'Copied!'

  }

  return (
    <>
      <div className='w-full py-8 h-screen bg-gray-950 box-border p-2'>

        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2  bg-blue-100'>
        <h1 className='text-slate-700 font-bold text-center text-3xl mb-2'>Password Generator</h1>
        <h3 className='copy_text text-center mb-1 invisible'>Copied!</h3>
          <div className='flex shadow-lg shadow-slate-400 rounded-full  overflow-hidden mb-8'>
          <input type="text"
          value={password}
          className='outline-none w-full py-2 px-4 '
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button
          className='px-4 py-2 uppercase font-semibold text-xl bg-blue-700 text-white'
          onClick={copyPasswordToClipBoard}
          >copy</button>
          </div>

          <div className='flex text-sm gap-x-4 pb-4 text-slate-700 font-bold flex-wrap justify-evenly'>
            <div className='flex items-center  gap-x-1'>
              <input
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer '
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label htmlFor="">Length: {length}</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
                defaultChecked={numAllowed}
                className='w-4 '
                onChange={()=>{
                  setNumAllowed((prev)=>!prev)
                }} />
                <label htmlFor="">Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
              type="checkbox"
              defaultChecked={charAllowed}
              className='w-4 '
              onChange={()=>{
                setCharAllowed((prevValue)=>!prevValue)
              }}
               />
               <label htmlFor="">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App