import {check} from '../utils/check'
import jwt from 'jsonwebtoken'

const __TOKEN_CACHE__: {
  [key: string]: {
    createdAt: number
    token: string
  }
} = {}

export function getSpectraToken(tenantId?: string) {
  check(process.env.SPECTRA_ADMIN_LOGIN_EMAIL, 'SPECTRA_ADMIN_LOGIN_EMAIL is not present in the environment')
  check(process.env.SPECTRA_ADMIN_LOGIN_PASSWORD, 'SPECTRA_ADMIN_LOGIN_PASSWORD is not present in the environment')
  check(process.env.SPECTRA_TOKEN_SECRET, 'SPECTRA_TOKEN_SECRET is not present in the environment')

  let tokenPayload: {tenantId: string; groupId: string; userId: string; role: string; isPlatformSuperAdmin: boolean} = {
    tenantId: tenantId ?? 'tenant',
    groupId: 'group',
    userId: 'user',
    role: 'Super Admin',
    isPlatformSuperAdmin: true,
  }

  const token = jwt.sign(tokenPayload, process.env.SPECTRA_TOKEN_SECRET, {
    expiresIn: '1h',
  })

  return token
}
