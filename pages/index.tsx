import type { NextPage } from 'next'

import Layout from '../src/layout/Layout'
import MainLayout from '../src/layout/MainLayout'
import Header from '../src/components/header/Header'
import AudioPlayer from '../src/components/audio/AudioPlayer'
import MenuDrop from '../src/components/header/Menu'
import RadioButton from '../src/components/audio/RadioButton'
import { useEffect, useState } from 'react'
import axios from 'axios'



const Home: NextPage = () => {

  const [textSpeaker, setTextSpeaker] = useState<any>([])

  const [convx, setConvx] = useState<any>([])

  const [currentId, setCurrentId ] = useState<string>("")

  const getAudioDetails = (param:string) => {
    
    const data = axios.get("/api/audios/get-audio")
      .then((datax) => {
        setConvx(datax.data)
      }).catch((err) => {
        console.log(err)
      })
      
    return data
  }


  useEffect(() => {

    // traer audio
    getAudioDetails(currentId)

    const initialState = convx.map((el: any) => {
      return {
        conversationId: el.conversation_id,
        speakerLabel: 1, // Agente default,
        text: el.message
      }
    })

    setTextSpeaker(initialState)
    
  }, [])

  const handleOnChange = ({ conversationId, speakerLabel }: { conversationId: number, speakerLabel: number }) => {

    const idx = textSpeaker.findIndex((element: any) => element.conversationId == conversationId)

    if (idx != -1) {
      const newStateArray = [...textSpeaker]
      newStateArray[idx] = {
        conversationId,
        speakerLabel
      }
      setTextSpeaker(newStateArray)
    } else {
      setTextSpeaker((prev: any) => [...prev, {
        conversationId,
        speakerLabel
      }])
    }


  }

  return (
    <Layout>
      <MainLayout>

        <Header title='Hola' />

        <AudioPlayer audio={convx[0]?.audio_name} />

        <div>
          {/*convx.map((datax: any, idx: number) => {
            return <div key={idx + "convo"}>
              <div className='text-center my-2 md:w-5/12 text-dark-primary rounded-md py-1 bg-white w-10/12 mx-auto' >
                {datax.message}
              </div>

              <div className='flex mx-auto  items-center justify-between'>
                <RadioButton handleChange={handleOnChange} conversationId={datax.convId} />
              </div>

            </div>
          })*/}
        </div>

        <div className='container mx-auto my-16 text-center'>
          <button onClick={()=>{
            getAudioDetails(" ")
          }} className='bg-sky-400 px-16 py-2 text-sky-900 font-semibold rounded-lg'>Siguiente</button>
        </div>

      </MainLayout>
    </Layout>
  )
}

export default Home
