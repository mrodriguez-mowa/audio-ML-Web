import React from 'react'
import MenuDropdown from './Menu'
import Image from 'next/image'

interface IHeader {
    title: string
}

const Header = ({ title }: IHeader) => {
    return (
        <div className='container md:w-7/12  mx-auto py-6 text-center'>
            <div className='flex flex-row justify-around'>
                
                <Image className='mx-auto ' src="/assets/mowa_logox.png" width={120} height={120} alt='Mowa_Logo' />
                
                <div className='relative'>
                    <MenuDropdown  />
                </div>

            </div>
        </div>

    )
}

export default Header