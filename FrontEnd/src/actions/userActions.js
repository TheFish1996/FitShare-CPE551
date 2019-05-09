const ipAdress = "http://localhost:5000"
export function loginAuthentication(email, password) {
    return async function(dispatch) {
        dispatch({type: "FETCHING_DATA"})

        try {
            let response = await fetch(`${ipAdress}/api/authenticateUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            let responseJson = await response.json();
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: responseJson
            })
        } catch (error) {
            console.log(error)
        }

    }
}

export function purchaseProgram(userID, programName) {
    return async function(dispatch) {
        dispatch({type: "FETCHING_DATA"})

        try {
            let response = await fetch(`${ipAdress}/api/purchasedProgram`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: userID,
                    programName: programName
                })
            })
            let responseJson = await response.json();
            dispatch({
                type: "BOUGHT_PROGRAM",
                payload: responseJson
            })
        } catch (error) {
            console.log(error)
        }

    }
}



export function logout(){
    return {
        type: "LOGOUT_SUCCESS"
    }
}