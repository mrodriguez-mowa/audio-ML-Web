import type { NextPage } from 'next'

import Layout from '../src/layout/Layout'
import MainLayout from '../src/layout/MainLayout'
import Header from '../src/components/header/Header'
import AudioPlayer from '../src/components/audio/AudioPlayer'
import MenuDrop from '../src/components/header/Menu'
import RadioButton from '../src/components/audio/RadioButton'
import { useEffect, useState } from 'react'



const Home: NextPage = () => {
  const convo = [{
    text: "HOLA! Me comunico con Luis?",
    convId: 1
  }, {
    text: "Sí, el habla",
    convId: 2
  }, {
    text: "Me contacto por encargo de la empresa",
    convId: 3
  }, {
    text: "No pagué porque tuve problemas con",
    convId: 4
  }]

  const [textSpeaker, setTextSpeaker] = useState<any>([])

  useEffect(() => {
    const initialState = convo.map((el) => {
      return {
        conversationId: el.convId,
        speakerLabel: 1 // Agente default
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

        <AudioPlayer audio="demo.mp3" />

        <div>
          {convo.map((datax, idx) => {
            return <div key={idx + "convo"}>
              <div className='text-center my-2 md:w-5/12 text-dark-primary rounded-md py-1 bg-white w-10/12 mx-auto' >
                {datax.text}
              </div>

              <div className='flex mx-auto  items-center justify-between'>
                <RadioButton handleChange={handleOnChange} conversationId={datax.convId} />
              </div>

            </div>
          })}
        </div>

        <div className='container mx-auto my-16 text-center'>
          <button  className='bg-sky-400 px-16 py-2 text-sky-900 font-semibold rounded-lg'>Siguiente</button>
        </div>

      </MainLayout>
    </Layout>
  )
}

export default Home
