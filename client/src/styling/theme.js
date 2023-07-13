import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c387e'
    },
    secondary: {
      main: '#e65100'
    }
  },
  // overrides: {
  //   MuiButton: {
  //     root: {
  //       fontWeight: "bold",
  //       backgroundColor: "#FFFFFF",
  //       margin: "10px",
  //       "&:hover": {
  //         backgroundColor: "#4285F4"
  //       }
  //     }
  //   }
  // }
})

export default theme;