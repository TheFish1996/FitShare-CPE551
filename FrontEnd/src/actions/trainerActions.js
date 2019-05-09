const ipAdress = "http://localhost:5000"
export function discoverTrainers(){
    return async function(dispatch){
        dispatch({type: "FETCHING_TRAINERS"})

        try {          
            let response = await fetch(`${ipAdress}/api/discoverTrainers`)
            let responseJson = await response.json();
            dispatch({
                type: "FETCHING_SUCCESS",
                trainerDetails: responseJson
            })

        } catch (error) {
            console.log(error)
        }

    }
}