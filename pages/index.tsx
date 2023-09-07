"use client"
import type { NextPage } from 'next'

import Layout from '../src/layout/Layout'
import MainLayout from '../src/layout/MainLayout'
import Header from '../src/components/header/Header'
import AudioPlayer from '../src/components/audio/AudioPlayer'
import RadioButton from '../src/components/audio/RadioButton'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TailwindLoader from '../src/components/loader/TailwindLoader'

import { useSelector } from "react-redux";
import { RootState } from "../src/redux/store";

const Home: NextPage = () => {

  const [textSpeaker, setTextSpeaker] = useState<any>([])

  const [convx, setConvx] = useState<any>([])

  const [currentId, setCurrentId] = useState(null)

  const { userId } = useSelector((state: RootState) => state.auth)

  const [userID, setUserID] = useState<any>(userId)

  useEffect(()=>{
    const user = localStorage.getItem("userId") ? localStorage.getItem("userId") : userId
    setUserID(user)
  }, [])

  const getAudioDetails = (param: any) => {
    console.log("param fn", param)
    axios.post(`/api/audios/get-audio`, {
      id: param,
      userID
    })
      .then((datax) => {
        // console.log(datax)
        setConvx(datax.data)
        const audio_code = datax.data[0].audio_code

        setCurrentId(audio_code)
        localStorage.setItem("audio_code", audio_code)

        const convStatus = datax.data.map((element: any) => {
          return {
            conversationId: element.id,
            speakerLabel: 1,
            text: element.message
          }
        })
        // console.log(convStatus)
        setTextSpeaker(convStatus)
      }).catch((err) => {
        console.log(err)
      })
  }

  const getAudioDetailsMongo = (audioId: any) => {
    axios.post("/api/mongo/audios/get-audio", {
      userID,
      audioId
    }).then((dataz) => {
      const audioId = dataz.data[0]._id
      setCurrentId(audioId)
      setConvx(dataz.data)

      localStorage.setItem("audio_code", audioId)

      const convInitialState = dataz.data[0].audioConversation.map((el:any) => {
        return {
          conversationId: el._id,
          speakerLabel: 1, // DEFAULT VALUE IS AGENT
          text: el.message
        }
      })

      setTextSpeaker(convInitialState)

    })
  }


  useEffect(() => {
    const audioCode = currentId == null ? localStorage.getItem("audio_code") : currentId

    // getAudioDetails(audioCode)

    getAudioDetails(audioCode)

  }, [])

  const handleOnChange = ({ conversationId, speakerLabel }: { conversationId: number, speakerLabel: number }) => {

    const idx = textSpeaker.findIndex((el: any) => el.conversationId == conversationId)

    console.log(textSpeaker, "textspeaker")

    const newStateArray = [...textSpeaker]

    newStateArray[idx].speakerLabel = speakerLabel

    setTextSpeaker(newStateArray);
  }

  const handleSubmit = async () => {

    // todo: usar redux para manejar estos datos
    const userId = localStorage.getItem("userId")

    await axios.post("/api/audios/classify-audio", { textSpeaker, userId, currentId })
    getAudioDetails(null)
  }

  const handleSubmitMongo = async () => {

    console.log(userID)

    await axios.post("/api/mongo/audios/classify-audio", { textSpeaker, userID, currentId })
    getAudioDetails(null)
  }



  return (
    <Layout>
      <MainLayout>

        <Header title='Hola' />
        <>
          {convx[0]?.audio_name ? <AudioPlayer audioId={() => { getAudioDetails(null) }} audioCode={convx[0].audio_code} audio={convx[0].audio_name} /> : <TailwindLoader />}
        </>

        <div>
          {convx.map((datax: any, idx: number) => {
            return <div key={idx + "convo"}>
              <div className='text-center my-2 md:w-5/12 text-dark-primary rounded-md py-1 bg-white w-10/12 mx-auto' >
                {datax.message}
              </div>

              <div className='flex mx-auto  items-center justify-between'>
                <RadioButton handleChange={handleOnChange} conversationId={datax.id} />
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
