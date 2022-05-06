import React, { useEffect, useState, useReducer } from 'react';
import Gun from 'gun';
import { useAuthUser } from '../providers/AuthProvider';

const gun = Gun({
  peers: ['http://localhost:3000/gun', 'http://cs334proj2group8.herokuapp.com/gun'],
});

const initialState = {
  messages: [],
};

function reducer(state, message) {
  return {
    messages: [message, ...state.message],
  };
}

export default function DirectMessages() {
  const authUser = useAuthUser();
  const [formState, setFormState] = useState({ name: '', message: '' });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const messages = gun.get('messages');
    messages.map().on((m) => {
      dispatch({
        name: m.name,
        message: m.message,
        createdAt: m.createdAt,
      });
    });
  }, []);

  useEffect(() => {
    setFormState({ ...formState, [formState.name]: authUser.username });
  }, [authUser]);

  function onChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function saveMessages() {
    const messages = gun.get('messages');
    const date = new Date();
    messages.set({
      name: formState.name,
      message: formState.message,
      createdAt: date.toUTCString(),
    });
    setFormState({
      name: authUser.username,
      message: '',
    });
  }
  return <></>;
}
