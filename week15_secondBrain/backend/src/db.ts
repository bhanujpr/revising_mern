import mongoose,{ model , Schema} from "mongoose";

// const Schema = Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


// const tagSchema = new mongoose.Schema({
  //   title: { type: String, required: true, unique: true }
  // });
  
  
  
const contentTypes = ['image', 'Youtube', 'Twitter', 'audio']; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true, unique:true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});


const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true ,unique:true},
});


export const userModel = model('User',userSchema);
export const contentModel = model("Content",contentSchema);
export const linkModel = model("Link",linkSchema)