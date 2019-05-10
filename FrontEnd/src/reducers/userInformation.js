const userData = {
    refreshing: false,
    userData: {},
    loginSuccess: false,
}

function userInformation(state = userData, action){
    switch (action.type) {
        case "FETCHING_DATA":
            return {
                ...state,
                refreshing: true
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                userData: action.payload,
                loginSuccess: true,
                refreshing: false
        }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                userData: {},
                loginSuccess: false,     //when users logs out we want to set dataStream back to null, and login state,
        }
        case "BOUGHT_PROGRAM":
            return {
                ...state,
                userData: action.payload,
        }
        case "UPLOADED_PROGRAM":
            return {
                ...state,
                userData: action.payload,
                refreshing: false
        }
        default:
            return state
    }
}

export default userInformation;