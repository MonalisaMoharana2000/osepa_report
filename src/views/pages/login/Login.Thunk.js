import { authenticationAPI } from '../../../api/api'

export const authenticateAPI = async (body) => {
  return await authenticationAPI.get(`/authUserCred/${body.userid}/${body.pswd}`)
}
