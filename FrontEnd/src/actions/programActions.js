const ipAdress = "http://localhost:5000"
export function getAllPrograms(){
    return async function(dispatch){
        dispatch({type: "FETCHING_PROGRAMS"})

        try {          
            let response = await fetch(`${ipAdress}/api/allPrograms`)
            let responseJson = await response.json();
            dispatch({
                type: "FETCHING_ALL_PROGRAMS_SUCCESS",
                allPrograms: responseJson
            })

        } catch (error) {
            console.log(error)
        }

    }
}

export function getSponsoredPrograms(){
    return async function(dispatch){
        dispatch({type: "FETCHING_PROGRAMS"})

        try {          
            let response = await fetch(`${ipAdress}/api/sponsoredPrograms`)
            let responseJson = await response.json();
            dispatch({
                type: "FETCHING_SPONSORED_PROGRAMS_SUCCESS",
                sponsoredPrograms: responseJson
            })

        } catch (error) {
            console.log(error)
        }

    }
}

export function uploadProgram(formData){
    return async function(dispatch){
        dispatch({type: "FETCHING_PROGRAMS"})

        try {
            let response = fetch(`${ipAdress}/api/upload`, {
                method: 'POST',
                body: formData
            })
            let responseJson = await response.json()
            console.log(responseJson)
            dispatch({
                type: "UPLOADED_PROGRAM",
                payload: responseJson
            })
        } catch (error) {
            console.log(error)
        }

    }
}