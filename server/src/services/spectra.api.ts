import axios from 'axios'
import jwt from 'jsonwebtoken'
import {check} from '../utils/check'

const {SPECTRA_API_URL} = process.env
check(SPECTRA_API_URL, 'SPECTRA_API_URL is not present in the environment')
axios.defaults.baseURL = SPECTRA_API_URL

// get token from spectra
export async function spectraLogin() {
  const {SPECTRA_ADMIN_LOGIN_EMAIL, SPECTRA_ADMIN_LOGIN_PASSWORD} = process.env
  check(SPECTRA_ADMIN_LOGIN_EMAIL, 'SPECTRA_ADMIN_LOGIN_EMAIL is not present in the environment')
  check(SPECTRA_ADMIN_LOGIN_PASSWORD, 'SPECTRA_ADMIN_LOGIN_PASSWORD is not present in the environment')

  const {data} = await axios.post(`${SPECTRA_API_URL}/login`, {
    email: SPECTRA_ADMIN_LOGIN_EMAIL,
    password: SPECTRA_ADMIN_LOGIN_PASSWORD,
  })
  check(data.auth_bearer, 'Spectra Gave unexpected response from /api/login API')

  console.log('Spectra Login Successful')
  const decoded: any = jwt.decode(data.auth_bearer)
  //* Example decoded
  // {
  //   userId: '',
  //   userName: '',
  //   tenantName: '',
  //   tenantId: '',
  //   groupId: '',
  //   role: '',
  // }

  check(decoded?.groupId, 'Spectra Gave unexpected response from /api/login API')

  axios.defaults.headers.common['authorization'] = data.auth_bearer
  axios.defaults.headers.common['data-gid'] = decoded.groupId
}

// create a tenant in spectra
export async function createTenant(payload: {
  name: string
  poc: {
    fname: string
    email: string
  }
}) {
  check(payload.name.length, 'Name should not be empty')
  check(payload.poc.fname.length, 'First Name should not be empty')
  check(payload.poc.email.length, 'Email should not be empty')

  const payloadCopy: any = {
    ...payload,
    subscribed_plan: 'Lite',
    billing_plan: 'monthly',
    account_status: 'active',
    address: [[, '..']],
    poc: {...payload.poc, phone: '0000000000'},
  }

  return axios
    .post('/tenant', payloadCopy)
    .then(response => {
      return response.data
    })
    .catch(error => {
      if (error.response.data?.message === 'Name already used!')
        throw new Error('Tenant name exists, Enter different name')
      throw new Error(error.response.data?.message)
    })
}

// second layer is creating products
export async function createProduct() {}
