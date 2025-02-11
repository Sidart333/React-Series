import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

function Github() {
    const data = useLoaderData()
    // const [data, setData]=useState([])
    // useEffect(() => {
    //     fetch('https://api.github.com/users/Sidart333')
    //         .then(response => response.json()).then(data => {
    //             console.log(data);
    //             setData(data)
    //     })
    // }, [])
    
  return (
    <div className="container mx-auto flex flex-col items-center py-4 bg-slate-600 ">
      <h1 className="text-center text-3xl text-white py-4">
        Github followers: {data.followers}
      </h1>
      <img className="w-96" src={data.avatar_url} alt="git pic" />
    </div>
  );
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch("https://api.github.com/users/Sidart333");
    return response.json()
}