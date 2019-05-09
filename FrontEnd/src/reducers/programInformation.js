const programData = {
    refreshing: false,
    allPrograms: [],
    sponsoredPrograms: []
}

function programInformation(state = programData, action){
    switch (action.type) {
        case "FETCHING_PROGRAMS":
            return {
                ...state,
                refreshing: true
            }
        case "FETCHING_ALL_PROGRAMS_SUCCESS":
            return {
                ...state,
                allPrograms: action.allPrograms,
                refreshing: false
        }
        case "FETCHING_SPONSORED_PROGRAMS_SUCCESS":
            return {
                ...state,
                sponsoredPrograms: action.sponsoredPrograms,
                refreshing: false
        }
        case "FETCHING_ERRROR":
            return {
                ...state,
                allPrograms: [],
                sponsoredPrograms: []
            }
        default:
            return state
    }
}

export default programInformation;