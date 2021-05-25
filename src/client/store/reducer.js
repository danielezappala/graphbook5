
const reducer = (state, action) => {
    switch (action.type) {
        case "SETUSEREMAIL":
            console.log('global state on SETUSEREMAIL  ', state)
            return {
                ...state,
                email: action.payload
            }
        case "SETUSERPASSWORD":
            console.log('global state on SETUSEREMAIL  ', state)
            return {
                ...state,
                password: action.payload
            }
        case "SHOWLOGIN":
            console.log('global state on SHOWLOGIN  ', state)
            return {
                ...state,
                showLogin: true
            }
        case "SHOWSIGNUP":
            console.log('global state on SHOWSIGNUP  ', state)
            return {
                ...state,
                showLogin: false
            }
        case "LOGIN":
            console.log('global state on LOGIN  ', state)
            return {
                ...state,
                loggedIn: true
            }
        case "SIGNUP":
            console.log('global state on LOGIN  ', state)
            return {
                ...state,
                loggedIn: true
            }
        case "LOGOUT":
            console.log('global state on LOGOUT  ', state)
            return {
                ...state,
                loggedIn: false
            }
        case "OPEN_SETTINGS":
            console.log('global state on OPEN_SETTINGS  ', state)
            return {
                ...state,
                isSettingsDialogOpen: true
            }
        case "CLOSE_SETTINGS":
            console.log('close_settings')
            return {
                ...state,
                isSettingsDialogOpen: false
            }
        case "SELECT_PAGE":
            console.log('select page')
            return {
                ...state,
                selectedPageTitle: action.payload
            }

        case "SELECTED_SEASON":

            return {
                ...state,
                selectedSeason: state.selectedSeason
            }
        
        
        default:
            {
                return state
            }
    }

}

export default reducer;