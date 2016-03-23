const {Tabs,Tab} = mui;
const {MapsLocalShipping,ActionHistory,ActionPayment} =mui.SvgIcons;
const Colors = mui.Styles.Colors;
const styles={
  icons:{
    margin:'auto',
    width:28,
    color:'white',
    height:28,
    fill: Colors.pink500
  }
}
UserPage = React.createClass({
  componentWillMount: function() {
    Session.set('pageTitle','Mis datos');
  },
  render: function() {
    return (
      <Tabs>
        <Tab
          icon={<div><MapsLocalShipping style={styles.icons}/> </div>}>

        </Tab>
        <Tab
          icon={<div><ActionHistory style={styles.icons}/></div>}>

        </Tab>
        <Tab
          icon={<div><ActionPayment style={styles.icons}/></div>}>
        </Tab>
      </Tabs>
    );
  }

});
