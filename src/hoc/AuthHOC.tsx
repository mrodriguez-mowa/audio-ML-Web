import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

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
      {children}
    </div>
  )
}

export default AuthHOC