const userData = {
    emailAdress: "Email Adress",
    password: "",
    loginSuccess: false
}

function userInformation(state = userData, action){
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                emailAdress: "DidThisWork@gmail.com", //const {email address, etc}  = action.payload
                loginSuccess: true
        }
        default:
            return state
    }
}

export default userInformation;