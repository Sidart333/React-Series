import { useState } from "react";

function App() {
  const [color, setcolor] = useState("olive");

  return (
    <div className="w-full h-screen" style={{ backgroundColor: color }}>
      <div className="fixed flex flex-wrap justify-center inset-x-0 bottom-12 px-2">
        <div className="flex flex-wrap justify-center gap-2 shadow-xl bg-white px-4 py-2 rounded-2xl">
          <button
            onClick={() => setcolor("red")}
            className="outline-none px-6 py-1 rounded-2xl text-xl text-white shadow-xl"
            style={{ backgroundColor: "red" }}
          >
            Red
          </button>
          <button
            onClick={() => setcolor("green")}
            className="outline-none px-6 py-1 rounded-2xl text-xl text-white shadow-xl"
            style={{ backgroundColor: "green" }}
          >
            Green
          </button>
          <button
            onClick={() => setcolor("blue")}
            className="outline-none px-6 py-1 rounded-2xl text-xl text-white shadow-xl"
            style={{ backgroundColor: "blue" }}
          >
            blue
          </button>
          <button
            onClick={() => setcolor("purple")}
            className="outline-none px-6 py-1 rounded-2xl text-xl text-white shadow-xl"
            style={{ backgroundColor: "purple" }}
          >
            purple
          </button>
          <button
            onClick={() => setcolor("aqua")}
            className="outline-none px-6 py-1 rounded-2xl text-xl text-white shadow-xl"
            style={{ backgroundColor: "aqua" }}
          >
            Aqua
          </button>
          <button
            onClick={() => setcolor("gold")}
            className="outline-none px-6 py-1 rounded-2xl text-xl text-white shadow-xl"
            style={{ backgroundColor: "gold" }}
          >
            Gold
          </button>
          <button
            onClick={() => setcolor("brown")}
            className="outline-none px-6 py-1 rounded-2xl text-xl text-white shadow-xl"
            style={{ backgroundColor: "brown" }}
          >
            Brown
          </button>
          <button
            onClick={() => setcolor("orchid")}
            className="outline-none px-6 py-1 rounded-2xl text-xl text-white shadow-xl"
            style={{ backgroundColor: "orchid" }}
          >
            Orchid
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
