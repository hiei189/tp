const { TextField, Dialog, Checkbox,Divider,RaisedButton} = mui;
const Colors = mui.Styles.Colors;

const styles = {
  container: {
    display: 'flex',
    flexDirection:'column',
    margin: 'auto',
    justifyContent:'space-around'
  },
  field: {
    margin: 'auto',
    width:'60%',
    minWidth:'256'
  },
  forms: {
    margin: 'auto',
    width:'100%',
    textAlign:'center'
  },
  checkbox:{
    width:'60%',
    margin:'auto',
  },
  containerDialog:{
    maxWidth:512,
  },
  imageContainer:{
    width: '100%',
    textAlign:'center',
    paddingTop:16,
  },
  button:{
    margin: 'auto',
    width:'20%',
    minWidth:'256',
    marginTop:'24'
  },
img:{
    width: '60%'
  }
}


LoginPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    muiTheme: React.PropTypes.object,
    router:React.PropTypes.object,
    token: React.PropTypes.object
  },
  componentWillMount: function() {
    Session.set('pageTitle','Inicia sesión');
    this.token = Session.get('token');
  },

  getInitialState: function() {
    return {
      email: '',
      password:'',
      remember:false,
      recoverPassword:false
    };
  },
  getTitle: function(){
    return (
      <div style={styles.imageContainer}>
        <img src={"/images/LogoAlta.png"} style={styles.img}/>
      </div>)
  },
  handleLogin:function(){
    data.loginUser(this.state.remember,
      this.state.email,
      this.state.password,
      this.context.token.access_token,
      (err,response)=>{
        console.log(response);
        if(response.data.success){
          this.context.router.goBack();
        }
      });
  },

  handleChangeEmail: function(e){
    this.setState({
      email: e.target.value
    });
  },

  handleChangePassword:function(e){
    this.setState({
      password: e.target.value
    });
  },

  handleChangeCheck: function(e){
    this.setState({
      remember: e.target.checked
    });
  },

  recoverPassword:function(){
    this.setState({
      recoverPassword: !this.state.recoverPassword
    });
  },

  handleSocialLogin: function() {
    data.socialLogin(this.token.access_token,(err,response)=>{
      this.context.router.goBack();
    });
  },

  createNewUser:function(){
    this.context.router.push('/createUser');
  },

  render: function() {
    return (
      <div style={styles.container}>
        {this.state.recoverPassword?
          (
            <form style={styles.forms}>
            <TextField
              floatingLabelText="Digita tu email"
              type="email"
              style ={styles.field}
              valueLink={this.linkState('recoveryEmail')}/><br/>
            <RaisedButton
              label="Recupera tu clave"
              primary={true}
              style ={styles.button}
            /><br/>
          </form>
          )
          :
          (
          <form style={styles.forms}>
            <TextField
              floatingLabelText="Correo"
              type="email"
              style ={styles.field}
              onChange ={this.handleChangeEmail}
              value={this.state.email}
            /><br/>
            <TextField
              floatingLabelText="Contraseña"
              type="password"
              onChange ={this.handleChangePassword}
              style ={styles.field}
            /><br/>
            <Checkbox
              label="Recuérdame"
              style={styles.checkbox}
              checked = {this.state.remember}
              onCheck = {this.handleChangeCheck}
              labelStyle={{color:this.context.muiTheme.textField.hintColor,textAlign:'left'}}
            /><br/>
            <RaisedButton
              label="Iniciar sesión"
              onTouchTap ={this.handleLogin}
              primary={true}
              style ={styles.button}
            /><br/>
            <RaisedButton
              label="facebook"
              onTouchTap ={this.handleSocialLogin}
              primary={true}
              style ={styles.button}
            />
            <br/>
          </form>
          )
        }
        <div style={styles.field}>
          <div style = {{display:'flex','flexWrap':'wrap',justifyContent:'space-between',marginTop:12}}>
            <span style={{cursor:'pointer',color:Colors.pink800}} onTouchTap={this.recoverPassword}>
              {!this.state.recoverPassword?'Olvidé mi contraseña':'Inicia sesión'}
            </span>
            <span style={{cursor:'pointer',color:Colors.pink800,float:'right'}}
              onTouchTap={this.createNewUser}>Registrate</span>
          </div><br/>
        </div>
      </div>
    );
  }
});
