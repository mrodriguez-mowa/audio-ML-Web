import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AuthHOC from '../../src/hoc/AuthHOC'
import Header from '../../src/components/header/Header'

import ProgressBar from "react-customizable-progressbar"


const Reports = () => {
  
  const [data, setData] = useState<any>(null)

    const getReportsToday = async () => {
        const id = localStorage.getItem("userId")

        const res = await axios.get(`/api/audios/report?id=${id}`);
        console.log(res.data)
        setData(res.data)
        
    }

    useEffect(() => {
        getReportsToday()
    }, [])

  return (
    <AuthHOC>
            <div className="w-full  min-h-screen bg-light-white">
                <div className="container pb-10  items-center justify-center mx-auto h-full ">
                    {data ? (
                        <>
                            <Header title={`Tu progreso, ${data.name} ${data.lastname}`} />

                            <p className='text-center'>Tu progreso, <strong>{`${data.name} ${data.lastname}`}</strong> </p>

                            <div className='flex my-4 flex-col-reverse justify-center md:justify-around w-full'>



                                <ProgressBar
                                    progress={data.classified_today && data.classified_today != 0 ? (data.classified_today / data.daily_goal) * 100 : 0}
                                    radius={75}
                                    className='mx-auto'
                                    strokeColor="#5d9cec"

                                >
                                    <span className='your-indicator font-semibold'>
                                        {data.classified_today && data.classified_today != 0 ? Math.floor((data.classified_today / data.daily_goal) * 100) : 0} %
                                    </span>
                                </ProgressBar>

                                <p className='my-4 text-center'>

                                    Tu estado es:
                                    {data.classified_today == data?.daily_goal ? <span className="bg-green-100 text-green-800 text-xs font-medium  mx-4 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Logrado</span> : <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mx-4 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">En curso</span>}

                                </p>


                                <div className='bg-orange-300 mt-4 mb-8 relative shadow-md justify-around items-center flex w-10/12 mx-auto md:w-3/12 py-5 rounded-lg'>
                                    <span className='rounded-full text-orange-300 px-2 py-2 bg-orange-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                    </span>

                                    <div>
                                        <p className='text-orange-600 text-sm'> Calificados <strong>últimos 4 días</strong>  </p>
                                        <p className='text-orange-800 text-center font-semibold text-xl'>{data.classified_four_days ? data.classified_four_days : 0}</p>
                                    </div>
                                </div>



                                <div className='bg-sky-300 mt-4 mb-8 relative shadow-md justify-around items-center flex w-10/12 mx-auto md:w-3/12 py-5 rounded-lg'>
                                    <span className='rounded-full text-sky-300 px-2 py-2 bg-sky-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                    </span>

                                    <div>
                                        <p className='text-sky-600 text-sm'> Calificados <strong>hoy</strong>  </p>
                                        <p className='text-sky-800 text-center font-semibold text-xl'>{data.classified_today ? data.classified_today : 0}</p>
                                    </div>
                                </div>

                                <div className='bg-green-300 mt-4 mb-8 relative shadow-md justify-around items-center flex w-10/12 mx-auto md:w-3/12 py-5 rounded-lg'>
                                    <span className='rounded-full text-green-300 px-2 py-2 bg-green-500'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#EEEE" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                    </span>

                                    <div>
                                        <p className='text-green-600 text-sm'> <strong>Total</strong>  de calificados </p>
                                        <p className='text-green-800 text-center font-semibold text-xl'>{data.classified_total ? data.classified_total : 0}</p>
                                    </div>
                                </div>

                            </div>

                            <div className='w-10/12 my-10 text-center  mx-auto'>

                                <p>
                                    Recuerda que la meta diaria son <strong>{data?.daily_goal} audios </strong> 🤖
                                </p>

                            </div>
                        </>

                    ) : null}
                </div>
            </div>
        </AuthHOC>
  )
}

export default Reports