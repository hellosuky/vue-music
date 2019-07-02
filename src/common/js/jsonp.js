import originJSONP from 'jsonp'

export default function jsonp(url, data, options) {
  // 封装成promise，结构的优化

  url += url.indexOf('?') === -1 ? '?' : ''
  url += params(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function params(data) {
  let params = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    params += `&${k}=${value}`
  }
  return params.substring(1)
}
