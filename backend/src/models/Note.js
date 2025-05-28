// Define MongoDB schema using Mongoose.

import mongoose, { mongo } from "mongoose"
//steps
//1. create schema
//2. model based of that schema
const noteSchema = new mongoose.Schema()(
  // create schema
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt
)
// 2. Create the model based on the schema
const Note = mongoose.model("Note", noteSchema)

/*
const Note = mongoose.model("Note", noteSchema)
This creates a Mongoose model named "Note" based on the noteSchema.

"Note" is the collection name (Mongoose auto-pluralizes it to notes).

It allows you to use Note.find(), Note.create(), etc.
*/
export default Note
