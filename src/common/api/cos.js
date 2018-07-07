import {cosConfigUrl} from "@/common/api/path/cos";
import {get} from '@/common/network/netaxios.js'


export function cosConfig() {
  let url = cosConfigUrl
  let params = {}
  return get(url, params)
}
