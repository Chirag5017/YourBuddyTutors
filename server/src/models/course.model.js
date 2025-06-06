import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        tutorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        studentsEnrolled: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

export const Course = mongoose.model("Course", courseSchema);