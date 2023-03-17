import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {UserModel} from '../models/user.model'
import {TypedRequest} from '../types/typed-request.types'
import {check} from '../utils/check'
import * as spectraAPI from '../services/spectra.api'

export async function index(req: Request, res: Response) {
  res.send({message: 'alive'})
}

export async function signin(req: TypedRequest<{}, {email?: string; password?: string}>, res: Response) {
  check(process.env.JWT_SECRET, 'JWT_SECRET not set in environment')
  const {email, password} = req.body
  if (!email || !password) {
    return res.status(400).json({message: 'Email and password are required'})
  }

  const user = await UserModel.findOne({email}).lean()
  if (!user) {
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await UserModel.create({email, password: hashedPassword})
    const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return res.status(201).json({message: 'Logged in successfully', email, token: token})
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({message: 'Invalid credentials'})
  }

  const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'})
  return res.status(200).json({message: 'Logged in successfully', email, token: token})
}

export async function getUserDetails(req: TypedRequest<{}, {}>, res: Response) {
  const {email} = req.params
  const user = await UserModel.findOne({email}).select('-password').lean()
  return res.status(200).json({user})
}

export async function updateUser(
  req: TypedRequest<
    {},
    {
      demoId?: string
      stageId?: 'tenant' | 'products' | 'customers-and-sites' | 'users-and-groups'
      data: any
    }
  >,
  res: Response,
) {
  const {email} = req.params
  const {stageId, demoId} = req.body
  const data = req.body.data || {}
  const update: any = {}

  console.log('stageID', stageId)

  check(stageId, 'stageId is required')
  check(['tenant', 'products', 'customers-and-sites', 'users-and-groups'].includes(stageId), 'Invalid stageId provided')

  const user = await UserModel.findOne({email}).lean()
  if (!user) {
    return res.status(404).json({message: 'User not found'})
  }

  if (stageId === 'tenant') {
    //* tenant account creation in the spectra as well as create user in spectra under the tenant

    //* check if demo already exists
    check(!user.demos?.length, 'Demo already exists, For now cannot create another demo')

    const {tenantName} = data
    check(tenantName, 'Tenant name is required')

    //* create a tenant in spectra
    const tenant = await spectraAPI.createTenant({
      name: tenantName,
      poc: {
        fname: 'test',
        email,
      },
    })
    check(tenant?._id, 'Tenant got created but tenantId is not present on the response from spectra')

    const newDemo = {
      tenantName,
      stagesCompleted: ['tenant'],
      tenantId: tenant._id,
    }
    update.demos = [newDemo]
  } else {
    const demo = user.demos.find(demo => demo._id === demoId)
    if (!demo) {
      return res.status(404).json({message: 'Demo not found'})
    }
    const stagesCompleted = demo.stagesCompleted
    if (stagesCompleted.includes(stageId)) {
      return res.status(400).json({message: 'Stage already completed'})
    }

    if (stageId === 'products') {
      const {
        products,
      }: {
        products?: Array<{
          name: string
          parameters: Array<
            | 'temperature'
            | 'pressure'
            | 'humidity'
            | 'light'
            | 'voltage'
            | 'current'
            | 'volume'
            | 'status'
            // | 'acceleration'
            | 'gps'
          >
        }>
      } = data

      check(products?.length, 'Products are required')

      //* create products in spectra
      // const productsCreated = await spectraAPI.createProducts({
      //   tenantId,
      //   products,
      // })

      // check(productsCreated, 'Products got created but products are not present on the response from spectra')
    }
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    {email},
    {
      ...update,
    },
    {
      new: true,
    },
  ).lean()

  return res.send({message: 'updated successfully', user: updatedUser})
}
