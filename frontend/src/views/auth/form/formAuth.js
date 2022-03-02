/* eslint-disable */
import { url } from 'src/fetchs/url-host';

const createNewUser = async (values) => {
  return (await fetch(`http://${url}/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(values)
  })).json();
}

const loginUser = async (values) => {
  return (await fetch(`http://${url}/user/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(values)
  })).json();
}

export {
  createNewUser,
  loginUser
}
