import React, { ReactNode } from "react";
import AuthHOC from "../hoc/AuthHOC";



interface ILayout {
    children: ReactNode
}

// En caso sea la ruta "auth" no emplear el HOC

const Layout = ({children}:ILayout):JSX.Element => {
  return (
    <>
      <AuthHOC>{children}</AuthHOC>

    </>
  );
};

export default Layout;
