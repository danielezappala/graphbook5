
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

        case "INC_ROWSNUM":

            return {
                ...state,
                rowsNum: state.rowsNum - 1
            }
        case "DEC_ROWSNUM":

            return {
                ...state,
                rowsNum: state.rowsNum - 1
            }
        case "CHANGE_ROWSNUM":

            return {
                ...state,
                rowsNum: action.payload
            }
        case "CHANGE_COLSNUM":

            return {
                ...state,
                colsNum: action.payload
            }

        case "INC_COLSNUM":
            return {
                ...state,
                colsNum: state.colsNum + 1
            }

        case "DEC_COLSNUM":
            return {
                ...state,
                colsNum: state.colsNum - 1
            }

        case "INC_MATCH":
            return {
                ...state,
                match: state.match + 1
            }
        case "INC_TOTALTIME":
            return {
                ...state,
                totalTime: state.totalTime + 1
            }
        case "DEC_TOTALTIME":
            return {
                ...state,
                totalTime: state.totalTime - 1
            }

        case "INC_COUNTDOWN":
            return {
                ...state,
                countDown: state.countDown + 1
            }
        case "DEC_COUNTDOWN":
            return {
                ...state,
                countDown: state.countDown - 1
            }
        case "ROLL_DICES":
            return {
                ...state,
                //rolls:makeRollDices()
            }
        default:
            {
                return state
            }
    }

}

export default reducer;