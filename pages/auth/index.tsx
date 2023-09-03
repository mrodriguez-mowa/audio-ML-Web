import React, {useState} from 'react'
import SignIn from '../../src/components/auth/SignIn';
import SignUp from '../../src/components/auth/SignUp';

const Auth = () => {

  const [isSignIn, setIsSignIn] = useState(true)

  const handleChangeForm = (value:boolean) => {
    setIsSignIn(value);
  }

  return (
    <div className="w-full min-h-screen text-sm flex flex-col justify-center items-center">
      <div className="flex justify-between flex-col md:flex-row w-full h-[100vh] min-h-[100vh] ">
        <div className="w-8/12 bg-light-white hidden md:flex flex-col justify-center items-center">
          <img className="h-auto w-6/12" src="/assets/mowito.png" alt="login_img" />
        </div>
        <div className="w-full bg-dark-primary md:w-4/12 h-full flex flex-col items-center justify-center">
          <img className="h-20" src="/assets/mowa_logo.png" alt="logo_mowa" />
          {isSignIn ? <SignIn changeForm={handleChangeForm} /> : <SignUp  changeForm={handleChangeForm}/>}
        </div>
      </div>
    </div>
  )
}

export default Auth