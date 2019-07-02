import jsonp from '../common/js/jsonp'
import {commonParams, options} from '../common/js/config'

export function getRecommand () {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  return jsonp(url, commonParams, options)
}
