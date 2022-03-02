/* eslint-disable */
import { url } from 'src/fetchs/url-host';

const logout = async (isLogin=true, user={}) => {
  if (isLogin) {
    return await(await fetch(`http://${url}/user/logout`, {
      method: 'POST',
      headers: {
        authorization: user.accessToken
      }
    })).json();
  }
}

export {
  logout
}
