import axios from 'axios'

export function api({url, option, method}) {
  return axios({
    method,
    url: url,
    ...option,
  })
}
