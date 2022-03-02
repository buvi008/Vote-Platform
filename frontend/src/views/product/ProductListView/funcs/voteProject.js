/* eslint-disable */
import { url } from 'src/fetchs/url-host';


const voteProject = async (token, variant, project) => {
  return await (await fetch (`http://${url}/addLike`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'authorization': token
    },
    body: JSON.stringify({
      variant: variant,
      project: project,
    })
  })).json();
}


export {
  voteProject
}
