import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

const Home: NextPage = () => {
  const [location, setLocation] = useState("")

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let data = {
      uri: event.target.uri.value,
      exp: event.target.exp.value
    }

    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/links'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    const url = "https://localhost:3000/" + result.location
    if (result.message === "success") setLocation(url)
  }

  return (
    <div className="h-screen w-full justify-center items-center flex bg-slate-800">
      <div className="flex flex-col bg-slate-700 p-52 rounded-md">
        <form className='flex' onSubmit={handleSubmit}>
          <label>
            <input name="uri" className="bg-slate-100 focus:outline-none shadow-sm focus:ring-2 focus:ring-purple-500 rounded-md py-2 px-5 " type="text" placeholder='https://www.google.com' />
            <input name="exp" type="date" className="bg-slate-100 w-40 m-5 focus:outline-none shadow-sm focus:ring-2 focus:ring-purple-500 rounded-md py-2 px-5 " placeholder='Exp: 2022-01-01' />
          </label>
          <button type='submit'className='border border-purple-500 focus:outline-none rounded-md py-2 px-5 text-white hover:bg-purple-500 hover:text-black'>Submit</button>
        </form>
        {location && (
          <div className="bg-green-200 p-5 my-5 rounded-md font-mono flex items-center">
            <p>{location}</p>
            <button 
              onClick={() => {navigator.clipboard.writeText(location)}}
              className='focus:outline-none rounded-md border border-slate-700 hover:bg-slate-700 hover:text-white px-5 py-2 mx-5'>Copy!</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
