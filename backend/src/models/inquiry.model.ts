import mongoose from "mongoose";


export interface IInquiry extends Document {
  name: string;
  phone: string;
  message: string;
}
const inquirySchema = new mongoose.Schema<IInquiry>({
    name : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
        unique : true,
        max : 10
    },
    message : {
        type : String,
        required : true
    }
},{timestamps : true})

export const Inquiry = mongoose.model("Inquiry", inquirySchema)