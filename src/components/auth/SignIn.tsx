import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { authLocalStorage, signInResult } from "../../redux/slice/authSlice";

interface ISignIn {
    changeForm: (value: boolean) => void;
}

const SignIn = ({ changeForm }: ISignIn) => {
    
    const dispatch: AppDispatch = useDispatch();

    const [data, setData] = useState<any>({
        username: "",
        password: "",
    });

    const { push } = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            push("/");
        } else {
            setIsAuthenticated(false)
            push("/auth");
        }
    }, [isAuthenticated]);

    const handleInputChange = ({ id, value }: { id: string; value: string }) => {
        setData((prev: any) => {
            return {
                ...prev,
                [id]: value,
            };
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        toast.loading("Autenticando...", {
            toastId: "loginToast",
        });

        setTimeout(async () => {
            const res = await axios.post("/api/auth/sign-in", data);

            toast.update("loginToast", {
                type: res.data.isLogged ? "success" : "warning",
                render: res.data.isLogged
                    ? "¡Bienvendido!"
                    : "Usuario o contraseña incorrectos",
                isLoading: false,
                autoClose: 1000,
            });

            console.log(res.data)

            if(res.data.isLogged){
                dispatch(
                    signInResult({
                        isAdmin: res.data.isAdmin,
                        user: res.data.userName,
                        userId: res.data.userId,
                        isAuth: res.data.isLogged,
                    })
                );
    
                dispatch(authLocalStorage())
                
                setTimeout(() => {
                    if (res.data.isLogged) {
                        push("/");
                    }
                }, 1000);
            }

            

            
        }, 1000);
    };

    return (
        <form
            onSubmit={(e: React.ChangeEvent<any>) => {
                handleSubmit(e);
            }}
            className="w-11/12 max-w-lg text-light-white my-4 "
        >
            <div className="bg-light-dark shadow-md rounded px-8 pt-8 pb-6 mb-4">
                <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2" htmlFor="username">
                        Usuario:
                    </label>
                    <input
                        required
                        onChange={(e: React.ChangeEvent<any>) => {
                            handleInputChange(e.target);
                        }}
                        value={data.username}
                        className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="username"
                        type="text"
                        placeholder="user@example.com"
                    />
                </div>
                <div className="mb-4">
                    <label className="block  text-sm font-bold mb-2" htmlFor="password">
                        Contraseña:
                    </label>
                    <input
                        required
                        onChange={(e: React.ChangeEvent<any>) => {
                            handleInputChange(e.target);
                        }}
                        value={data.password}
                        className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="password"
                        type="password"
                        placeholder="******************"
                    />
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <button
                    type="submit"
                    className="my-4 text-light-white bg-red-400 hover:opacity-90 px-10 py-2 rounded-lg"
                >
                    Iniciar Sesión
                </button>
                <p
                    onClick={() => changeForm(false)}
                    className="text-sm text-center underline mx-a underline-offset-8 my-4 cursor-pointer hover:opacity-90 text-light-white"
                >
                    ¿No tienes cuenta?
                </p>
            </div>
        </form>
    );
};

export default SignIn;
