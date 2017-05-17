import { getMuiTheme } from "material-ui/styles";
import {
    darkBlack, grey900, lightBlue500,
    lightGreen100,
    lightGreen500,
    lightGreen700,
    white,
} from "material-ui/styles/colors";
import spacing from "material-ui/styles/spacing";
import { fade } from "material-ui/utils/colorManipulator";

const theme = getMuiTheme({
    spacing,
    fontFamily: "Roboto, sans-serif",
    palette: {
        primary1Color: lightGreen500,
        primary2Color: lightGreen100,
        primary3Color: lightGreen700,
        accent1Color: lightBlue500,
        accent2Color: lightBlue500,
        accent3Color: lightBlue500,
        textColor: grey900,
        alternateTextColor: white,
        borderColor: "#b6b6b6",
        disabledColor: fade(darkBlack, 0.3),
        canvasColor: white,
    },
});

export default theme;
