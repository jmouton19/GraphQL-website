import React, { useEffect, useContext, createContext, useState } from 'react';

import { gql } from '@apollo/client';
import { useNotify } from './NotificationProvider';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://cs334proj2group8.herokuapp.com/graphql/',
});

const initialClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

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

const AuthUserStorageItemName = 'kasie-auth-user';

function AuthProvider({ children }) {
  // state
  const [client, setClient] = useState(initialClient);
  const [authUser, setAuthUser] = useState(
    JSON.parse(window.localStorage.getItem(AuthUserStorageItemName))
      ? JSON.parse(window.localStorage.getItem(AuthUserStorageItemName))
      : JSON.parse(window.sessionStorage.getItem(AuthUserStorageItemName))
  );

  console.log(authUser)

  // hooks:
  const notify = useNotify();

  // save authUser to local storage [remember me] or session storage (on authUser change)
  useEffect(() => {
    if (authUser) {
      if (authUser.rememberMe) {
        window.localStorage.setItem(
          AuthUserStorageItemName,
          JSON.stringify(authUser)
        );
      } else {
        window.sessionStorage.setItem(
          AuthUserStorageItemName,
          JSON.stringify(authUser)
        );
      }
    }
  }, [authUser]);

  // change client to authorised client (on authUser change)
  useEffect(() => {
    const authLink = setContext(() => {
      return {
        headers: {
          authorization: authUser ? `Bearer ${authUser.jwt}` : '',
        },
      };
    });

    const newClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    setClient(newClient);
  }, [authUser]);

  const signUp = ({
    avatar,
    email,
    firstName,
    lastName,
    password,
    username,
    rembemberMe,
  }) => {
    return new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: gql`
            mutation {
              addUser(
                input: {
                  email: "${email}"
                  username: "${username}"
                  password: "${password}"
                  avatar: "${avatar}"
                  firstName: "${firstName}"
                  lastName: "${lastName}"
                }
              ) {
                success
                message
                jwt
                user {
                  email
                  id
                  firstName
                  lastName
                  avatar
                  username
                  validated
                }
              }
            }
          `,
        })
        .then((result) => {
          const { success, message, user, jwt } = result.data.addUser;
          if (success) {
            setAuthUser({
              ...user,
              jwt,
              rembemberMe: rembemberMe ? true : false,
            });
            notify('success', message);
            resolve();
          } else {
            notify('error', message);
            reject();
          }
        });
    });
  };

  function logIn(email, password, rememberMe) {
    return new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: gql`
            mutation {
              userLogin(
                input: { email: "${email}", password: "${password}" }
              ) {
                success
                message
                jwt
                user {
                  email
                  id
                  firstName
                  lastName
                  avatar
                  username
                  validated
                }
              }
            }
          `,
        })
        .then((result) => {
          const { success, message, user, jwt } = result.data.userLogin;
          if (success) {
            setAuthUser({
              ...user,
              jwt,
              rememberMe: rememberMe ? true : false,
            });
            notify('success', message);
            resolve();
          } else {
            notify('error', message);
            reject();
          }

          // Todo: Need more descriptive messages here from backend
        });
    });
  }

  const logOut = () => {
    return new Promise((resolve) => {
      setAuthUser(null);
      window.localStorage.clear();
      window.sessionStorage.clear();
      resolve(true);
    });
  };

  return (
    <ApolloProvider client={client}>
      <AuthUserContext.Provider value={authUser}>
        <SignUpContext.Provider value={signUp}>
          <LogInContext.Provider value={logIn}>
            <LogOutContext.Provider value={logOut}>
              {children}
            </LogOutContext.Provider>
          </LogInContext.Provider>
        </SignUpContext.Provider>
      </AuthUserContext.Provider>
    </ApolloProvider>
  );
}

export default AuthProvider;
