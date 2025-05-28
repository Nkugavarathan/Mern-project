import mongoose from "mongoose"
export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongodb connectes succeffuly")
  } catch (error) {
    console.log("error connecting mongodb", error)
    process.exit(1) // exith witherro
  }
}
