import type { NextPage } from 'next'

import Layout from '../src/layout/Layout'
import MainLayout from '../src/layout/MainLayout'
import Header from '../src/components/header/Header'
import AudioPlayer from '../src/components/audio/AudioPlayer'
import RadioButton from '../src/components/audio/RadioButton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TailwindLoader from '../src/components/loader/TailwindLoader'



const Home: NextPage = () => {

  const [textSpeaker, setTextSpeaker] = useState<any>([])

  const [convx, setConvx] = useState<any>([])

  const [currentId, setCurrentId] = useState("")

  const getAudioDetails = (param: any) => {

    axios.get(`/api/audios/get-audio?id=${param}`)
      .then((datax) => {
        setConvx(datax.data)
        const audio_code = datax.data[0].audio_code
        
        setCurrentId(audio_code)
        localStorage.setItem("audio_code", audio_code)

        const convStatus = datax.data.map((element:any)=>{  
          return {
            conversationId: element.conversation_id,
            speakerLabel: 1,
            text: element.message
          } 
        }) 
        setTextSpeaker(convStatus)
      }).catch((err) => {
        console.log(err)
      })


  }


  useEffect(() => {
    const audioCode = currentId.length == 0 ? localStorage.getItem("audio_code") : currentId

    getAudioDetails(audioCode)

  }, [])

  const handleOnChange = ({ conversationId, speakerLabel }: { conversationId: number, speakerLabel: number}) => {


    const idx = textSpeaker.findIndex((el:any)=>el.conversationId == conversationId)
   
    
    const newStateArray = [...textSpeaker]

    newStateArray[idx].speakerLabel = speakerLabel

    setTextSpeaker(newStateArray);
  }

  const handleSubmit = async () => {
    
    // todo: usar redux para manejar estos datos
    const userId = localStorage.getItem("userId")

    await axios.post("/api/audios/classify-audio", {textSpeaker, userId, currentId })
    getAudioDetails("")
  }

  return (
    <Layout>
      <MainLayout>

        <Header title='Hola' />
        <>
          {convx[0]?.audio_name ? <AudioPlayer audio={convx[0].audio_name} /> : <TailwindLoader />}
        </>


        <div>
          {convx.map((datax: any, idx: number) => {
            return <div key={idx + "convo"}>
              <div className='text-center my-2 md:w-5/12 text-dark-primary rounded-md py-1 bg-white w-10/12 mx-auto' >
                {datax.message}
              </div>

              <div className='flex mx-auto  items-center justify-between'>
                <RadioButton handleChange={handleOnChange} conversationId={datax.conversation_id} />
              </div>

            </div>
          })}
        </div>

        <div className='container mx-auto my-16 text-center'>
          <button onClick={() => {
            handleSubmit()
          }} className='bg-sky-400 px-16 py-2 text-sky-900 font-semibold rounded-lg'>Siguiente</button>
        </div>

      </MainLayout>
    </Layout>
  )
}

export default Home
