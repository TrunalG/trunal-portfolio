import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  slug: string
  title: string
  role: string
  type: string
  description: string
  image?: string
  className: string
  featured: boolean
  year: string
  kicker: string
  tagline: string
  introduction: string
  challenge: string
  client: string
  services: string
  finalThoughts: string
  liveUrl: string
  heroImage?: string
  gallery: string[]
}

const ProjectSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  role: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  className: { type: String, required: true },
  featured: { type: Boolean, default: false },
  year: { type: String, required: true },
  kicker: { type: String, required: true },
  tagline: { type: String, required: true },
  introduction: { type: String, required: true },
  challenge: { type: String, required: true },
  client: { type: String, required: true },
  services: { type: String, required: true },
  finalThoughts: { type: String, required: true },
  liveUrl: { type: String, required: true },
  heroImage: { type: String, default: '' },
  gallery: { type: [String], default: [] }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
})

// Prevent recompilation of model if it already exists
export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
