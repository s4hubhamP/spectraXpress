import mongoose from 'mongoose'
import {User} from '../types/user.types'

const userSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true, //* index
    },
    password: {
      type: String,
      required: true,
    },
    demos: {
      type: [
        {
          tenantName: {
            //* this is also default tenant name
            type: String,
            required: true,
            stagesCompleted: [
              {
                type: String,
                required: true,
                enum: ['tenant', 'products', 'customers-and-sites', 'users-and-groups'],
              },
            ],
          },
          tenantId: {
            type: mongoose.Types.ObjectId,
            required: true,
          },
          description: String,
          canUpdate: {
            type: Boolean,
            default: true,
          },
        },
      ],
      default: [],
      _id: true,
    },
  },
  {
    timestamps: true,
    _id: false,
  },
)

export const UserModel = mongoose.model<User>('User', userSchema, 'xpress_users')
