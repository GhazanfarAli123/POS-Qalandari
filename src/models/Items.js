import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
 quantity:{
    type: Number,
    required: true,
 },
 price:{
    type: Number,
    required: true,
 },
 saleprice:{
    type: Number,
    required: true,
 },
 group:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Group"
 },
 user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
 },
 barcode:{
    type:Number
 },
 category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
 },
 photo:{
    type:String,
   //  required:true
},
 slug:{
    type: String,
    required: true
  }
}, { timestamps: true });

const Items = mongoose.models.Items || mongoose.model('Items', ItemSchema);

export default Items;