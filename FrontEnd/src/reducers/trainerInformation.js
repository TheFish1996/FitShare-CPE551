const trainerData = {
    refreshing: false,
    trainerDetails: []
}

function trainerInformation(state = trainerData, action){
    switch (action.type) {
        case "FETCHING_TRAINERS":
            return {
                ...state,
                refreshing: true
            }
        case "FETCHING_SUCCESS":
            return {
                ...state,
                trainerDetails: action.trainerDetails,                  //const {email address, etc}  = action.payload,
                refreshing: false
        }
        case "FETCHING_ERRROR":
            return {
                ...state,
                trainerDetails: []
            }
        default:
            return state
    }
}

export default trainerInformation;