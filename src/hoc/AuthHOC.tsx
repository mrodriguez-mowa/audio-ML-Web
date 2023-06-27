import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import Loader from '../components/loader/Loader';

const AuthHOC = ({children}:any) => {

  const [isLogged, setIsLogged] = useState(false);

    const { push } = useRouter();
    useEffect(() => {
        const logged = localStorage.getItem("isAuthenticated");

        const authValue = logged == "true";

        setIsLogged(authValue);

        if (!authValue) {
            toast.error("Inicia sesión primero");
            setTimeout(() => {
                push("/auth");
            }, 1500);
        }
    }, []);

  return (
    <div>
      { isLogged ?  children : <Loader />}
    </div>
  )
}

export default AuthHOC