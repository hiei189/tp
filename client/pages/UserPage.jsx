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
  contextTypes:{
    gotUser: React.PropTypes.bool,
    router:React.PropTypes.object
  },
  getInitialState: function() {
    return {
      gotUser: false,
      user: {}
    };
  },

  componentWillMount: function() {
    const {router} = this.context;
    Session.set('selectedItem','user');
    Tracker.autorun((a)=>{
      const gotUser = Session.get('gotUser');
      this.trackerId_a = a;
      Tracker.nonreactive(()=>{
        if(gotUser){
          this.setState({
            user: Session.get('user'),
            gotUser:true
          });
        }else{

          this.setState({
            gotUser: false,
            user: {}
          });
        }
      });
    });
  },

  componentWillUnmount: function() {
    this.trackerId_a.stop();
  },

  render: function() {
    const {gotUser} = this.state;
    if(gotUser){
      return (
        <div>

        </div>
      );
    }else{
      return (
        <div>
          <LoginPage />
        </div>
      );
    }

  }
});
