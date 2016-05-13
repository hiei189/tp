const {FloatingActionButton} = mui;
const {ContentSend} = mui.SvgIcons;
const Colors = mui.Styles.Colors;

const styles = {
  footer:{
    position:'fixed',
    display:'flex',
    justifyContent:'flex-end',
    left:0,
    bottom:0,
    height:60,
    width:'100%',
    backgroundColor: Colors.grey100,
    minWidth: '100%',
    alignItems:'center',
    zIndex: 1000
  }
}


Footer = ({total,onSend,disabled})=>
  {
    return(
      <div style={styles.footer}>
        <h3 style={{marginRight:16}}>{'TOTAL: '+ total}</h3>
        <FloatingActionButton onTouchTap = {onSend} disabled = {disabled}>
          <ContentSend />
        </FloatingActionButton>
      </div>
    );
  }
;
