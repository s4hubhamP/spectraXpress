// import mongoose from 'mongoose'
// import {Stage} from '../types/stage.types'

// const stageSchema = new mongoose.Schema<Stage>(
//   {
//     tenantId: {
//       type: String,
//       required: true,
//     },
//     stageId: {
//       type: String,
//       required: true,
//       enum: ['tenant', 'products', 'customers-and-sites', 'users-and-groups'],
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: ['complete', 'error'],
//     },
//   },
//   {
//     timestamps: true,
//   },
// )

// stageSchema.index({tenantId: 1, stageId: 1}, {unique: true})
// export const StageModel = mongoose.model<Stage>('Stage', stageSchema, 'xpress_stages')
