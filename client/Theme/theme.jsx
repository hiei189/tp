const Colors = mui.Styles.Colors;
const ColorManipulator = mui.Utils.ColorManipulator;
const Spacing = mui.Styles.Spacing;
const zIndex = mui.Styles.ZIndex;
const {getMuiTheme} = mui.Styles;

theme =  getMuiTheme({
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.pink500,
    primary2Color: Colors.yellow500,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pink500,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.grey700,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.yellow500,
  },
  listItem:{
    hoverColor:Colors.pink100,
    selectedTextColor: Colors.pink500,
  },
  selectableContainerEnhance:{
    hoverColor:Colors.pink100,
    selectedTextColor: Colors.pink500,
  },
  tabs:{
    backgroundColor: Colors.white,
    textColor: ColorManipulator.fade(Colors.pink500, 0.5),
    selectedTextColor: Colors.pink500
  }
});
