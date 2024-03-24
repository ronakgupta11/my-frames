"use client"
import React, { useEffect, useState } from 'react'

function Page() {
    const [data,setData]  = useState([])
    const profile = "0xD7D98e76FcD14689F05e7fc19BAC465eC0fF4161"
    useEffect(()=>{
        async function fetchData(){
            const res = await fetch(`https://api-fxx5ywll2q-uc.a.run.app/framesUser/${profile}`)
            const data = await res.json()
            console.log("data",data)
return data?.frames
        }
        fetchData().then(d=>setData(d))

    },[])
     return (
    <div className='flex flex-col items-center justify-center'>
{data.map(
    d=>{
        return(

            <a target='_blank' className='text-center m-2' href={`https://my-first-frog-three.vercel.app/api/${d}`}>
                {d}
            </a>
        )
    }
)}
    </div>
  )
}

export default Page