import React, { ReactNode } from 'react'

interface ILayout {
    children: ReactNode
}


const MainLayout = ({children}: ILayout):JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-light-white">{ children }</div>
  )
}

export default MainLayout