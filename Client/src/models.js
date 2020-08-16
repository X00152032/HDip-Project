//use tables for models

let models = {
    subjectModel: {
        isNew: true,
        isValid: false,
        // model
        id: null,
        subjectName: null,
        description: null,
    },
    contentModel: {
        // used for validation
        isNew: true,
        isValid: false,
        // used for display
        isForHomePage: false,
        // model
        id: null,
        contentName: null,
        description: null,
        text: null,
        HomepageArticle: false,
        picture: null,
        subjectId: null,
    },
    userModel: {
        // used for validation
        isNew: true,
        isValid: false,
        // used for display
        isAdmin: false,
        // model
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        role: null,
    }
}

export default models;
