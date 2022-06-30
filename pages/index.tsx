import type { NextPage } from 'next'
import { useState } from 'react'
import Btn from "../components/Btn"

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

  return (<>
    <form className='flex' onSubmit={handleSubmit}>
      <label>
        <input name="uri" className="bg-slate-100 focus:outline-none shadow-sm focus:ring-2 focus:ring-purple-500 rounded-md py-2 px-5 " type="text" placeholder='https://www.google.com' />
        <input name="exp" type="date" className="bg-slate-100 w-40 m-5 focus:outline-none shadow-sm focus:ring-2 focus:ring-purple-500 rounded-md py-2 px-5 " placeholder='Exp: 2022-01-01' />
      </label>
      <Btn type="submit" className="text-white border-purple-500 hover:bg-purple-500">Submit</Btn>
    </form>
    {location && (
      <div className="bg-green-200 p-5 my-5 rounded-md font-mono flex items-center">
        <p>{location}</p>
        <Btn onClick={() => {navigator.clipboard.writeText(location)}} text="Copy!" className="border-slate-700 hover:bg-slate-700">Copy</Btn>
      </div>
    )}
    </>
  )
}

export default Home
