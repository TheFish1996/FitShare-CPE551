const userData = {
    user: {},
    loginSuccess: false
}

function userInformation(state = userData, action){
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: {}, //const {email address, etc}  = action.payload
                loginSuccess: true
        }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                user: {},
                loginSuccess: false     //when users logs out we want to set dataStream back to null, and login state
            }
        default:
            return state
    }
}

export default userInformation;