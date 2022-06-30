import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Link from 'next/link'
import Btn from "../components/Btn"
import useSWR from 'swr'


// @ts-ignore
const fetcher = (...args: any) => fetch(...args).then(res => res.json())

const Redirect: NextPage = () => {

  const router = useRouter()
  const { query, isReady } = router

  const id = query.id
  let { data, error } = useSWR(isReady ? [`/api/${id}`] : null, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data || !isReady) return <div>Loading...</div>

  const location = data.uri

  return (
  <div className="flex flex-col space-y-4 items-center justify-center">
    <p className="text-white font-semibold">Go to <a href={location} className='px-2 py-1 text-slate-200 bg-slate-800 rounded-md'>{location}</a>?</p>
    <a href={location}><Btn className="text-white hover:text-black border-green-200 hover:bg-green-200">Take me there!</Btn></a>
    <Link href="/"><Btn className="text-white hover:text-black border-slate-800 hover:bg-slate-800">Go back</Btn></Link>
  </div>
  )
}

export default Redirect