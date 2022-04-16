import React, { useContext, createContext, useState } from 'react';

import { gql, useApolloClient } from '@apollo/client';

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
      });
  };

  const logIn = (email, password) => {
    client
      .query({
        query: gql`
          mutation {
            userLogin(input: { email: "${email}", password: "${password}" })
          }
        `,
      })
      .then((result) => {
        console.log(result);
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
