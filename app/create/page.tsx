"use client"
import FileUpload from '@/components/fileUpload'
import { Button, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import axios from "axios"

function Page() {
    const [frameId,setFrameId] = useState("")
    const [hash,setHash] = useState("")
    const [page,setPages] = useState("")
    const [receiver,setReceiver] = useState("")
    const [created,setCreated] = useState(false)
   
    const flow = "3805175"
    console.log("hash",hash,page)
const handleCreate = async()=>{

    const data ={
        folder:hash,
        pages:page,
        receiver :receiver,
        flow
    }
    const res = await axios.post(`https://api-fxx5ywll2q-uc.a.run.app/postFrame/${receiver}`,data)
    console.log(res.data.message.split(" ")[2])
    setFrameId(res.data.message.split(" ")[2])
    setCreated(true)
}
  return (
    <div className='flex flex-col space-y-4 items-center justify-center p-4'>
        <p>enter receiver wallet address to receive stream</p>
        <TextInput  className="max-w-60"onChange={(e)=>setReceiver(e.target.value)}/>
        <p>select images for your medium post or comic</p>
        <FileUpload setHash={setHash} setPages = {setPages}/>

<Button onClick={handleCreate}>Create Frame</Button>
{created && <p>Successfully created frame </p>}
{ created && <p>{`https://my-first-frog-three.vercel.app/api/${frameId}`}</p>}


    </div>
  )
}

export default Page