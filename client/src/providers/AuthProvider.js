import React, { useEffect, useContext, createContext, useState } from 'react';

import { gql, useApolloClient } from '@apollo/client';

const AuthUserContext = createContext();
const SignUpContext = createContext();
const LogInContext = createContext();
const LogOutContext = createContext();

export function useAuthUser() {
  return useContext(AuthUserContext);
}

export function useSignUp() {
  return useContext(SignUpContext);
}

export function useLogIn() {
  return useContext(LogInContext);
}

export function useLogOut() {
  return useContext(LogOutContext);
}

const localStorageItemName = 'kasie-auth-user';

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(
    JSON.parse(window.localStorage.getItem(localStorageItemName))
  );

  // load auth user from local storage (initially)
  useEffect(() => {
    setAuthUser(JSON.parse(window.localStorage.getItem(localStorageItemName)));
  }, []);

  // save auth user to local storage (on change)
  useEffect(() => {
    window.localStorage.setItem(localStorageItemName, JSON.stringify(authUser));
  }, [authUser]);

  const client = useApolloClient();

  async function signUp(data) {
    // Todo: Update backend to handle rememberMe

    const {
      avatar,
      email,
      firstName,
      lastName,
      password,
      //rememberMe,
      username,
    } = data;

    return new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: gql`
          mutation {
            addUser(
              input: {
                avatar: "${avatar}"
                email: "${email}"
                firstName: "${firstName}"
                lastName: "${lastName}"
                password: "${password}"
                username: "${username}"
              }
            )
          }
        `,
        })
        .then((result) => {
          if (result.data.addUser === 'false') {
            reject();
          } else {
            logIn(email, password);
            resolve();
          }
        });
    });
  }

  async function logIn(email, password) {
    return new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: gql`
          mutation {
            userLogin(input: { email: "${email}", password: "${password}" })
          }
        `,
        })
        .then((result) => {
          if (result.data.userLogin === 'false') {
            reject();
          } else {
            const jwt = result.data.userLogin;
            loadUserProfile(email, jwt);
            resolve();
          }
        });
    });
  }

  const loadUserProfile = (email, jwt) => {
    client
      .query({
        query: gql`
        query {
          users(where: { email: { eq: "${email}" } }) {
            email
            id
            firstName
            lastName
            avatar
            username
          }
        }
      `,
      })
      .then((result) => {
        const retrievedProfile = result.data.users[0];
        if (retrievedProfile) {
          setAuthUser({ ...retrievedProfile, jwt });
        } else {
          //notifyError('Could not load user profile from server.');
        }
      });
  };

  const logOut = () => {
    setAuthUser(null);
  };

  return (
    <AuthUserContext.Provider value={authUser}>
      <SignUpContext.Provider value={signUp}>
        <LogInContext.Provider value={logIn}>
          <LogOutContext.Provider value={logOut}>
            {children}
          </LogOutContext.Provider>
        </LogInContext.Provider>
      </SignUpContext.Provider>
    </AuthUserContext.Provider>
  );
}

export default AuthProvider;
