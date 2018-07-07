import {user_info} from "@/common/api/path/user";
import {get} from '@/common/network/netaxios'

export function userInfo() {
  let url = user_info
  return get(url, {})
}
