import React, { useContext, createContext, useState } from 'react';

import { gql, useApolloClient } from '@apollo/client';
import { useNotifyError, useNotifySuccess } from './NotificationProvider';

const AuthUserContext = createContext();
const SignUpContext = createContext();
const LogInContext = createContext();

export function useAuthUser() {
  return useContext(AuthUserContext);
}

export function useSignUp() {
  return useContext(SignUpContext);
}

export function useLogIn() {
  return useContext(LogInContext);
}

function AuthProvider({ children }) {
  const [authUser] = useState(null);

  const client = useApolloClient();

  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();

  const signUp = (email, username, password) => {
    client
      .mutate({
        mutation: gql`
          mutation {
            addUser(
              input: {
                email: "${email}"
                username: "${username}"
                password: "${password}"
              }
            )
          }
        `,
      })
      .then((result) => {
        console.log(result);
        if (result.data.addUser) {
          notifySuccess('Signed up successfully.');
        } else {
          notifyError('Sign up failed.');
          // Todo: Need more descriptive messages here from backend
        }
      });
  };

  const logIn = (email, password) => {
    client
      .mutate({
        mutation: gql`
          mutation {
            userLogin(input: { email: "${email}", password: "${password}" })
          }
        `,
      })
      .then((result) => {
        if (result.data.userLogin) {
          notifySuccess('Logged in successfully.');
        } else {
          notifyError('Log in failed.');
          // Todo: Need more descriptive messages here from backend
        }
      });
  };

  return (
    <AuthUserContext.Provider value={authUser}>
      <SignUpContext.Provider value={signUp}>
        <LogInContext.Provider value={logIn}>{children}</LogInContext.Provider>
      </SignUpContext.Provider>
    </AuthUserContext.Provider>
  );
}

export default AuthProvider;
