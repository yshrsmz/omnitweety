import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'

// https://www.materialpalette.com/light-green/light-blue
const AppTheme = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#8bc34a',
        primary2Color: '#dcedc8',
        primary3Color: '#689f38',
        accent1Color: '#03a9f4',
        accent2Color: '#03a9f4',
        accent3Color: '#03a9f4',
        textColor: '#212121',
        alternateTextColor: Colors.white,
        borderColor: '#b6b6b6',
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
}
export default AppTheme;
