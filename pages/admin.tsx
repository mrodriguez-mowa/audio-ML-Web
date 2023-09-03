import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import moment from 'moment'
import AuthHOC from '../src/hoc/AuthHOC'
import Header from '../src/components/header/Header'
import BarChart from '../src/components/charts/BarChart'


const Admin = () => {

  const [show, setShow] = useState(false)
    // mensajes calificados 
    const [dataMessages, setDataMessages] = useState<any>([])
    // data usuarios para filtros
    const [dataUsers, setDataUser] = useState<any>([])
    // data promedio por hora
    const [average, setAverage] = useState<any>([])
    // data usuario por dia
    const [userPerDay, setUserPerDay] = useState<any>([])

    const { push } = useRouter()

    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin") == "true"
        if (isAdmin) {
            console.log("Es admin")
        } else {
            push("/")
        }

        setShow(isAdmin)
    }, [])

    useEffect(() => {
        if (show) {
            getClassifiedMessages()
            getMessagesByUser()
            getAverageByUser()
            getUserAnswersToday(date)
        }
    }, [show])

    const getClassifiedMessages = async () => {
        const data = await axios.get("/api/admin/type")
        setDataMessages(data.data)
    }

    const getMessagesByUser = async () => {
        const data = await axios.get("/api/admin/user")
        setDataUser(data.data)
    }

    const getAverageByUser = async () => {
        const data = await axios.get("/api/admin/average")
        setAverage(data.data)
    }

    const getUserAnswersToday = async (date:any) => {
        const data = await axios.post("/api/admin/user-day", {
            date
        })
        setUserPerDay(data.data)
    }

    const styles = [{
        bg: "bg-purple-300",
        iconBg: "bg-purple-500",
        iconText: "text-purple-300",
        cardTitle: "text-purple-600",
        cardDetail: "text-purple-800",
        icon: <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        </>

    }, {
        bg: "bg-yellow-300",
        iconBg: "bg-yellow-500",
        iconText: "text-yellow-300",
        cardTitle: "text-yellow-600",
        cardDetail: "text-yellow-800",
        icon: <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>

        </>

    }, {
        bg: "bg-green-300",
        iconBg: "bg-green-500",
        iconText: "text-green-300",
        cardTitle: "text-green-600",
        cardDetail: "text-green-800",
        icon: <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
            </svg>
        </>

    },
    {
        bg: "bg-slate-300",
        iconBg: "bg-slate-500",
        iconText: "text-slate-300",
        cardTitle: "text-slate-600",
        cardDetail: "text-slate-800",
        icon: <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>

        </>

    },
    {
        bg: "bg-red-300",
        iconBg: "bg-red-500",
        iconText: "text-red-300",
        cardTitle: "text-red-600",
        cardDetail: "text-red-800",
        icon: <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
            </svg>
        </>

    },
    {
        bg: "bg-orange-300",
        iconBg: "bg-orange-500",
        iconText: "text-orange-300",
        cardTitle: "text-orange-600",
        cardDetail: "text-orange-800",
        icon: <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
        </>

    },
    {
        bg: "bg-pink-300",
        iconBg: "bg-pink-500",
        iconText: "text-pink-300",
        cardTitle: "text-pink-600",
        cardDetail: "text-pink-800",
        icon: <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
        </>

    }, {
        bg: "bg-lime-300",
        iconBg: "bg-lime-500",
        iconText: "text-lime-300",
        cardTitle: "text-lime-600",
        cardDetail: "text-lime-800",
        icon: <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
        </>

    }]

  return (
    <AuthHOC>{show ? (<div className="w-full  min-h-screen pb-10 bg-light-white">
            <Header title='Seguimiento del proyecto' />
            <div className='block md:hidden divide-y'>
                <div className='md:w-8/12 divide-y  md:divide-x bg-white mx-auto overflow-hidden items-center flex flex-col md:flex-row w-10/12 h-auto rounded-lg shadow-md '>

                    <div className='md:w-4/12 w-full flex flex-col justify-center items-center h-full'>
                        <div className='bg-sky-300 min-h-full mt-4 mb-8 relative shadow-md justify-around items-center flex w-10/12 mx-auto  py-5 rounded-lg'>
                            <span className='rounded-full text-sky-300 px-2 py-2 bg-sky-500'>
                                {<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>}

                            </span>

                            <div>
                                <p className='text-sky-600 text-sm font-semibold'> TOTAL RESPUESTAS</p>
                                <p className='text-sky-800 text-center font-semibold my-4 text-3xl'>{
                                    dataMessages.reduce((sum: any, currentValue: any) => {
                                        const total = parseInt(currentValue.total);
                                        return sum + total;
                                    }, 0)
                                }</p>
                            </div>
                        </div>
                    </div>
                    <div className='md:w-8/12 w-full  flex flex-col justify-center items-center h-full'>

                        <div className='w-11/12 grid md:grid-cols-2 grid-cols-1 auto-rows-auto'>
                            {dataMessages.map((el: any, idx: number) => {
                                return (
                                    <div key={`stats-card-${idx}`} className={`${styles[idx].bg} mt-4 mb-8  relative shadow-md justify-around items-center flex w-10/12 mx-auto  py-5 rounded-lg`}>
                                        <span className={`rounded-full ${styles[idx].iconText} px-2 py-2 ${styles[idx].iconBg}`}>
                                            {styles[idx].icon}

                                        </span>

                                        <div >
                                            <strong className={`${styles[idx].cardTitle} text-sm`}> {el.new_type} </strong>
                                            <p className={`${styles[idx].cardDetail} text-center font-semibold text-xl`}>
                                                {el.total}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>


            <div className='md:w-8/12  px-10 my-10 bg-white mx-auto overflow-hidden items-center justify-center hidden md:flex flex-col w-10/12 h-auto rounded-lg shadow-md '>
                <div className='w-11/12 mx-auto flex items-center'>
                    <BarChart label="Respuestas" title={`Total Calificaciones ${dataMessages.reduce((sum: any, currentValue: any) => {
                        const total = parseInt(currentValue.total);
                        return sum + total;
                    }, 0)}`} data={dataMessages} />
                </div>
            </div>


            <div className='md:w-8/12  px-10 my-10 bg-white mx-auto overflow-hidden items-center justify-center hidden md:flex flex-col w-10/12 h-auto rounded-lg shadow-md '>
                <div className='w-11/12 mx-auto flex items-center'>
                    <BarChart label="Audios" title="Audios por Usuario" data={dataUsers} />
                </div>
            </div>


            <div className='md:w-8/12  px-10 my-10 bg-white mx-auto overflow-hidden items-center justify-center hidden md:flex flex-col w-10/12 h-auto rounded-lg shadow-md '>
                <div className='w-11/12 mx-auto flex items-center'>
                    <BarChart label="Audios" title="Promedio Audios por Hora" data={average} />
                </div>
            </div>

            <div className='md:w-8/12  px-10 my-10 bg-white mx-auto overflow-hidden items-center justify-center hidden md:flex flex-col w-10/12 h-auto rounded-lg shadow-md '>
                <input className='border-2 px-4 my-4 rounded-lg' type="date" onChange={(e)=>{
                    const datex = e.target.value
                    
                    setDate(datex)
                    getUserAnswersToday(datex)
                }} value={date} />
                <div className='w-11/12 mx-auto flex items-center'>
                    <BarChart label="Audios" title={`Audios por usuario | ${moment(date).format('DD-MM-YYYY')}`} data={userPerDay} />
                </div>
            </div>




        </div>) : null}</AuthHOC>
  )
}

export default Admin