import React from "react";

export default function Home() {
  return (
    <div className="font-thin flex py-24 px-4 gap-60 bg-slate-500 items-center justify-between">
      <div>
        <h1 className="text-white text-6xl leading-relaxed">
          Anything's Possible when you have the talent
        </h1>
        <p className="text-white text-2xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, eligendi.</p>
      </div>
      <div>
        <img className="rounded-xl"
          src="https://i.pinimg.com/736x/1c/07/44/1c074421db4c23f2e6ccfe68088cf4fe.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
