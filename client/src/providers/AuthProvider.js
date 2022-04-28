import React, { useEffect, useContext, createContext, useState } from 'react';

import { gql } from '@apollo/client';
import { useNotifyError, useNotifySuccess } from './NotificationProvider';
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
const LoadUserProfileContext = createContext();

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
export function useLoadUserProfile() {
  return useContext(LoadUserProfileContext);
}

const localStorageItemName = 'kasie-auth-user';

function AuthProvider({ children }) {
  const [client, setClient] = useState(initialClient);
  const [jwt, setJwt] = useState(null);
  const [loginEmail, setLoginEmail] = useState(null);
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

  useEffect(() => {
    const authLink = setContext(() => {
      return {
        headers: {
          authorization: jwt ? `Bearer ${jwt}` : '',
        },
      };
    });

    const newClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    setClient(newClient);
  }, [jwt]);

  useEffect(() => {
    loadUserProfile(loginEmail, jwt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();

  const signUp = (data) => {
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
  };

  async function logIn(email, password) {
    setLoginEmail(email);
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
          if (result.data.userLogin) {
            notifySuccess('Logged in successfully.');
            const jwt_temp = result.data.userLogin;
            setJwt(jwt_temp);
          } else {
            notifyError('Log in failed.');
            // Todo: Need more descriptive messages here from backend
          }
        });
    });
  }

  const loadUserProfile = (email, jwt) => {
    return new Promise((resolve, reject) => {
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
            memberships {
              id
              groupId
            }
          }
        }
      `,
        })
        .then((result) => {
          const retrievedProfile = result.data.users[0];
          if (retrievedProfile) {
            console.log("here");
            setAuthUser({ ...retrievedProfile, jwt });
            resolve(true);
          } else {
            //notifyError('Could not load user profile from server.');
            reject(false);
          }
        });
    });
  };

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
              <LoadUserProfileContext.Provider value={loadUserProfile}>
                {children}
              </LoadUserProfileContext.Provider>
            </LogOutContext.Provider>
          </LogInContext.Provider>
        </SignUpContext.Provider>
      </AuthUserContext.Provider>
    </ApolloProvider>
  );
}

export default AuthProvider;
