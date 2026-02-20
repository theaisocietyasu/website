import mongoose, { Schema, Model, Types } from 'mongoose'

export interface IProject {
  _id?: Types.ObjectId
  title: string
  description: string
  thumbnail_file_id?: Types.ObjectId
  github_url?: string
  live_url?: string
  collaborators: string[]
  published: boolean
  owner_discord_id: string
  created_at: Date
  updated_at: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      maxlength: 120,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail_file_id: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    github_url: {
      type: String,
      required: false,
      trim: true,
    },
    live_url: {
      type: String,
      required: false,
      trim: true,
    },
    collaborators: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
    },
    owner_discord_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

// Indexes for performance
ProjectSchema.index({ published: 1, created_at: -1 })
ProjectSchema.index({ title: 'text', description: 'text' })
ProjectSchema.index({ collaborators: 1 })
ProjectSchema.index({ owner_discord_id: 1 })

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)

export default Project
