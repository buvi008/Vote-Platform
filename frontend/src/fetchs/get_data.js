/* eslint-disable */
import { url } from 'src/fetchs/url-host';

const getData = async (city) => {
  try {
    return await (await fetch(`http://${url}/app/getDataProject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          city: city
        })
      }
    )).json();
  } catch (error) {
    return error.message;
  }
}

export {
  getData,
}
