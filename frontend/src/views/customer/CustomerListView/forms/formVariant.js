/* eslint-disable */
import { url } from 'src/fetchs/url-host';

const addNewVariant = async (values, token) => {
  try {
    const data = new FormData();
    for (let i=0; i < values.images.files.length; i++) {
      data.append('images', values.images.files[i]);
    }
    delete values.images
    for (let key in values) {
      data.append(key, values[key])
    }

    return await (await fetch(`http://${url}/app/postProject`, {
      method: 'PUT',
      headers: {
        authorization: token,
      },
      body: data
    })).json()
  } catch (e) {
    return {ok: false}
  }
}


export {
  addNewVariant
}
