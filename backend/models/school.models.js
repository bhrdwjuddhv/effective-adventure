import mongoose from 'mongoose'

const SchoolSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        unique: true,
        required: true
    },
    joinCode: {
        type: String,
        unique: true,
        required: true
    },
    schoolName: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    schoolAddress: {
        type: String,
        required: true,
    },
    board: {
        type: String,
        required: true,
    },
    classes: [
        {
            className: String,

            sections: [
                {
                    sectionName: String,

                    classTeacher: {
                        type: ObjectId,
                        ref: "User"
                    }
                }
            ]

        }],
    vacations:[ {
            vacationId: {
                type: String,
                unique: true,
            },
            title: String,
            startDate: String,
            endDate: String

    } ],
    schoolWebsite:{
        type:String,
    },
    adminId:{
        type:String,
        required:true,
    }
}, {timestamps: true})

const School = mongoose.model('School', SchoolSchema)
export default School;