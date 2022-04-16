import Router from "next/router";
import React, { ReactNode, useEffect } from "react";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../lib/firebase";

export const AuthCheck: React.FC<{children: ReactNode, login?: boolean}> = ({ children, login = false }) => {

  const [user] = useAuthState(auth);

  useEffect(() => {
    if ( login && !user) {
      Router.push('/')
    }
  }, [])
  
  return (
    <>
      { user ? children : null }
    </>
  )
}
