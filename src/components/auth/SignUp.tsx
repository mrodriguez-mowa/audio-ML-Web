import React, { useState } from "react"
import axios from "axios";
import { toast } from "react-toastify"

interface ISignUp {
    changeForm: (value: boolean) => void;
}

export interface ISignUpForm {
    name: string,
    lastName: string,
    username: string,
    password: string
}

const SignUp = ({ changeForm }: ISignUp) => {

    const [data, setData] = useState<ISignUpForm>({
        name: "",
        lastName: "",
        username: "",
        password: ""
    })

    const handleInputChange = ({ id, value }: { id: string, value: string }) => {
        setData((prev) => {
            return ({
                ...prev,
                [id]: value
            })
        })
    }

    const handleSubmit =  async (e: any) => {
        e.preventDefault()

        const res =  await axios.post('/api/auth/sign-up', data)
        
        const { created,message } = res.data

        if (created){
            console.log("creado")
            toast.success(message)
        } else {
            toast.warning(message)
        }
    }


    return (
        <form onSubmit={(e: React.ChangeEvent<any>) => {
            handleSubmit(e)
        }} className="w-11/12 text-light-white py-10 max-w-lg">
            <div className="bg-light-dark shadow-md rounded px-8 pt-8 pb-6 mb-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="name">
                            Nombres:
                        </label>
                        <input required value={data.name} className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200   rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="Jane" onChange={(e: React.ChangeEvent<any>) => {
                            handleInputChange(e.target)
                        }} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="lastName">
                            Primer Apellido:
                        </label>
                        <input required value={data.lastName} onChange={(e: React.ChangeEvent<any>) => {
                            handleInputChange(e.target)
                        }} className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="lastName" type="text" placeholder="Doe" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className=" block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="username">
                            Usuario:
                        </label>
                        <input required value={data.username} onChange={(e: React.ChangeEvent<any>) => {
                            handleInputChange(e.target)
                        }} className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="username" type="text" placeholder="user@example.com" />
                    </div>

                    <div className="w-full px-3">
                        <label className=" block uppercase tracking-wide  text-xs font-bold mb-2" htmlFor="password">
                            Contraseña:
                        </label>
                        <input required value={data.password} onChange={(e: React.ChangeEvent<any>) => {
                            handleInputChange(e.target)
                        }} className="text-dark-primary placeholder:text-gray-500 appearance-none block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="******************" />
                        <p className="text-gray-300 text-xs italic">Nota: Procura no olvidarla</p>
                    </div>
                </div>
            </div>


            <div className="flex flex-col">
                <button type="submit" className="my-4 text-light-white bg-red-400 hover:opacity-90 px-10 py-2 rounded-lg">Registrarme</button>
                <p onClick={() => changeForm(true)} className="text-sm text-center underline my-4 underline-offset-8 hover:opacity-90 text-light-white cursor-pointer" >¿Ya tienes cuenta?</p>
            </div>


        </form>
    )
}

export default SignUp