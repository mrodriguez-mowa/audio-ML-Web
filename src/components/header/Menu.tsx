import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store"; 


import { useRouter } from "next/navigation";
import { logout } from "../../redux/slice/authSlice";

export default function MenuDrop() {
  const dispatch: AppDispatch = useDispatch();
  
  const { push } = useRouter();
  const [isAdmin, setIsAdmin] = useState(false)

  const logoutFn = () => {
    dispatch(logout());
    push("/auth");
  };


  const redirectSite = (site: string) => {
    push(`${site}`);
  };

  useEffect(() => {
    const isAdministrator = localStorage.getItem("isAdmin") == "true"

    setIsAdmin(isAdministrator)

  }, [])


  return (
    <div className="absolute z-30 right-5 top-0 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">

              <Menu.Item>
                {() => (
                  <button onClick={(e) => {
                    e.preventDefault()
                    redirectSite("/")
                  }} className="hover:bg-dark-primary hover:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                    <HomeIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Cuestionario
                  </button>
                )}
              </Menu.Item>
              
              
              {isAdmin ? (<Menu.Item>
                {() => (
                  <button onClick={(e) => {
                    e.preventDefault()
                    redirectSite("/admin")
                  }} className="hover:bg-dark-primary hover:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                    <AdminIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Seguimiento
                  </button>
                )}
              </Menu.Item>) : null}
              
              

              <Menu.Item>
                {() => (
                  <button onClick={(e) => {
                    e.preventDefault()
                    redirectSite("/reports")
                  }} className="hover:bg-dark-primary hover:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                    <ReportsIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Mi progreso
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      logoutFn()
                    }}
                    className="hover:bg-dark-primary hover:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm"
                  >
                    <DuplicateInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Cerrar Sesión
                  </button>
                )}
              </Menu.Item>


            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function DuplicateInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#EDE9FE"
        stroke="#00ADB5"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#EDE9FE"
        stroke="#00ADB5"
        strokeWidth="2"
      />
    </svg>
  );
}

function ReportsIcon(props: any) {
  return (

    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="#EEE" viewBox="0 0 24 24" strokeWidth={2} stroke="#00ADB5" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>



  );

}

function HomeIcon(props: any) {
  return (

    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="#EEEE" viewBox="0 0 24 24" strokeWidth={2} stroke="#00ADB5" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>



  );
}

function AdminIcon(props: any) {
  return (

    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="#EEEE" viewBox="0 0 24 24" strokeWidth={2} stroke="#00ADB5" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>




  );
}



