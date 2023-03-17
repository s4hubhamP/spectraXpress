import axios from 'axios'
import {check} from '../utils/check'
import {getSpectraToken} from './getSpectraToken'

const {SPECTRA_API_URL} = process.env
check(SPECTRA_API_URL, 'SPECTRA_API_URL is not present in the environment')
axios.defaults.baseURL = SPECTRA_API_URL

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
    .post('/tenant', payloadCopy, {
      headers: {
        authorization: getSpectraToken(),
        'data-gid': 'group-id',
      },
    })
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
