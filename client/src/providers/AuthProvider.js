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

const localStorageItemName = 'kasie-auth-user';

function AuthProvider({ children }) {
  // state
  const [client, setClient] = useState(initialClient);
  const [authUser, setAuthUser] = useState(
    JSON.parse(window.localStorage.getItem(localStorageItemName))
  );

  // hooks:
  const notify = useNotify();

  // load authUser from local storage (initially)
  useEffect(() => {
    setAuthUser(JSON.parse(window.localStorage.getItem(localStorageItemName)));
  }, []);

  // save authUser to local storage (on authUser change)
  useEffect(() => {
    window.localStorage.setItem(localStorageItemName, JSON.stringify(authUser));
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

  function logIn(email, password) {
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
            });
            notify('success', message);
            resolve();
          } else {
            notify('error', message);
            reject();
          }
        });
    });
  }

  const logOut = () => {
    return new Promise((resolve) => {
      setAuthUser(null);
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
