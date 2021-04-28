    import React, { useEffect, useContext } from 'react';
    import GlobalState from "../../store/globalState" 
    import Typography from '@material-ui/core/Typography';


    export default  function HomePage() {
        
        const {globalState, globalDispatch} = useContext(GlobalState);
        
        return <Typography>Ciao</Typography>
    }