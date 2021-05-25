import { createTheme } from '@material-ui/core/styles'
import { lightBlue, brown, deepOrange } from '@material-ui/core/colors'

const theme = createTheme({
    spacing: 4,
    typography: {
      useNextVariants: true,
        button: {
          fontSize: '1rem',
          margin: '0px 0px'
        },
    },
    palette: {
      primary: {
      light: lightBlue[400],
      main: lightBlue[800],  
      dark: lightBlue[900],
      contrastText: '#fff',
    },
    secondary: {
        light: deepOrange[50],
        main: deepOrange[400],  
        dark: deepOrange[600],
      contrastText: '#000',
    },
      openTitle: '#3f4771',
      protectedTitle: brown['400'],
      type: 'light'
    }
})

export default theme