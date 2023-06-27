import React, { ReactNode } from "react";
import AuthHOC from "../hoc/AuthHOC";
import { ToastContainer } from "react-toastify";

interface ILayout {
    children: ReactNode
}

// En caso sea la ruta "auth" no emplear el HOC

const Layout = ({children}:ILayout):JSX.Element => {
  return (
    <>
      <AuthHOC>{children}</AuthHOC>
      <ToastContainer />
    </>
  );
};

export default Layout;
