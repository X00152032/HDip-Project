//use tables for models

let models = {
    subjectModel: {
        isNew: true,
        isValid: false,
        // model
        id: null,
        subjectName: null,
        description: null
    },
    contentModel: {
        // used for validation
        isNew: true,
        isValid: false,
        // model
        id: null,
        contentName: null,
        description: null,
        text: null,
        picture: null,
        subjectId: null
    },
}

export default models;
