import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%{}/*&^~`+_)(";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);
    
    const copyPasswordToClipboard = useCallback(() => { 
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0, 8)
        window.navigator.clipboard.writeText(password  )
    }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full mx-auto max-w-md rounded-lg px-4 py-4 my-8 text-2xl text-slate-500 bg-gray-500">
        <h1 className="text-slate-50 py-4">Password Generator</h1>
        <div className="flex gap-5">
          <div className="bg-slate-200 rounded-lg">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-3"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
          </div>
          <button onClick={copyPasswordToClipboard} className="bg-slate-100 px-5 hover:bg-slate-200 rounded-lg cursor-pointer">
            Copy
          </button>
        </div>
        <div className="flex my-4 text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-white text-xl">Length: {length}</label>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="text-white">
            Number
          </label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput" className="text-white">
            Character
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
