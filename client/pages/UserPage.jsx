const {MapsLocalShipping,ActionHistory,ActionPayment} =mui.SvgIcons;
const Colors = mui.Styles.Colors;

const styles={
  icons:{
    margin:'auto',
    width:28,
    color:'white',
    height:28,
    fill: Colors.pink500
  },
  container: {
    display: 'flex',
    flexDirection:'column',
    margin: 'auto',
    justifyContent:'space-around',
    fontFamily:'Roboto,sans-serif'
  },
  field: {
    margin: 'auto',
    width:'100%',
    minWidth:'212',
  },
  fieldPrice: {
    margin: 'auto',
    width:'calc(100% - 88px)',
  },
  form:{
    margin: 'auto',
    width:'100%'
  },
  headers:{
    margin:'auto',
    width:'60%',
    textAlign:'center',
    color:Colors.pink500
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
      user: {},
      firstname:'',

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
    const {gotUser,user} = this.state;
    console.log(user);
    if(gotUser){
      return (
        <div style={{marginBottom:'50px'}}>
          <Formsy.Form
            ref={'userForm'}
            onValidSubmit={this.submitUserForm}
            onInvalid = {this.invalidForm}
            style ={styles.form}>

            <FormsyText
              required
              floatingLabelText="Nombres"
              textFieldStyle = {{width:'100%'}}
              name = 'userFirstname'
              id ='userFirstname'
              value={this.state.firstname}
              style = {styles.field}
            />


          </Formsy.Form>
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
