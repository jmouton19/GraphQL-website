import React, { useEffect, useContext, createContext, useState } from 'react';

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

  console.log(authUser);

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
          const jwt = result.data.userLogin;
          loadUserProfile(email, jwt);
        } else {
          notifyError('Log in failed.');
          // Todo: Need more descriptive messages here from backend
        }
      });
  };

  const loadUserProfile = (email, jwt) => {
    client
      .query({
        query: gql`
        query {
          users(where: { email: { eq: "${email}" } }) {
            email
            firstName
            lastName
            avatar
          }
        }
      `,
      })
      .then((result) => {
        const retrievedProfile = result.data.users[0];
        if (retrievedProfile) {
          setAuthUser({ ...retrievedProfile, jwt });
        } else {
          notifyError('Could not load user profile from server.');
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
