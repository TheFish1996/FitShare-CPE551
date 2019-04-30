const userData = {
    user: {},
    loginSuccess: false
}

function userInformation(state = userData, action){
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                user: {}, //const {email address, etc}  = action.payload
                loginSuccess: true
        }
        default:
            return state
    }
}

export default userInformation;