import React from 'react'
import './loader.module.css'

const Loader = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center bg-dark-primary min-h-full'>
        <span className="loader"></span>
    </div>
  )
}

export default Loader