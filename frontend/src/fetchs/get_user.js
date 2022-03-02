/* eslint-disable */
import { url } from 'src/fetchs/url-host';

const getUser = async (user) => {
  return await ( await fetch(`http://${url}/user/getUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: user.accessToken
    },
    body: JSON.stringify({
      id: user.id,
      token: user.accessToken,
    })
  })).json();
}

export {
  getUser,
}
