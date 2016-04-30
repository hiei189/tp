const { TextField, Dialog, Checkbox,Divider,RaisedButton,Paper} = mui;
const Colors = mui.Styles.Colors;

const styles = {
  paperContainer:{
    width:'40%',
    minWidth:256,
    margin:'auto',
    padding:20,
    marginTop:20
  },
  container: {
    display: 'flex',
    flexDirection:'column',
    margin: 'auto',
    justifyContent:'space-around'
  },
  field: {
    margin: 'auto',
    width:'100%',

  },
  forms: {
    margin: 'auto',
    width:'100%',
    textAlign:'center'
  },
  checkbox:{
    width:'100%',
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
    minWidth:'224',
    marginTop:'16'
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

  handleLogin:function(model){
    const {email,password} = model.login;
    console.log(model);
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

  handleRecoveryPassword:function(model){
    console.log(model);
  },

  createNewUser:function(){
    this.context.router.push('/createUser');
  },


  errorMessages: {
    wordsError: "Solo use letras (a-z)",
    isDefaultRequiredValue: 'Este campo es requerido'
  },

  render: function() {
    let { wordsError } = this.errorMessages;
    return (
      <Paper style={styles.paperContainer}>
        <div style={styles.container}>
          {this.state.recoverPassword?
            (
              <div>
              <h2>Recupera tu contraseña</h2>
              <Formsy.Form
                ref={'recoveryPasswordForm'}
                onValidSubmit={this.handleRecoveryPassword}
                style ={styles.forms}>

                <FormsyText
                  name='recovery.email'
                  ref='recovery.email'
                  validations='isEmail'
                  validationError={wordsError}
                  required
                  floatingLabelText="Correo electrónico"
                  hintText={'Ingresa el correo con el creaste tu cuenta'}
                  type="string"
                  style ={styles.field}
                /><br/>

                <RaisedButton
                  label="Recupera tu clave"
                  primary={true}
                  type={'submit'}
                  style ={styles.button}
                /><br/>
              </Formsy.Form>
            </div>
            )
            :
            (
            <div>
              <h2>Inicio de sesión</h2>
              <Formsy.Form
                ref={'loginForm'}
                onValidSubmit={this.handleLogin}
                style ={styles.forms}>

                <FormsyText
                  name='login.email'
                  ref='login.email'
                  validations='isEmail'
                  validationError={wordsError}
                  required
                  floatingLabelText="Correo electrónico"
                  type="string"
                  id ="login.email"
                  value = {this.state.email}
                  style ={styles.field}
                /><br/>

                <FormsyText
                  name='login.password'
                  ref='login.password'
                  validations='isExisty'
                  validationError={wordsError}
                  required
                  floatingLabelText="Contraseña"
                  type="password"
                  id ="login.password"
                  value = {this.state.password}
                  style ={styles.field}
                /><br/>

                {/*<FormsyCheckbox
                  label="Recuérdame"
                  name = 'login.remember'
                  style={styles.checkbox}
                  checked = {this.state.remember}
                  labelStyle={{color:this.context.muiTheme.textField.hintColor,textAlign:'left'}}
                /><br/>*/}

                <RaisedButton
                  label="Iniciar sesión"
                  onTouchTap ={this.handleLogin}
                  primary={true}
                  type={'submit'}
                  style ={styles.button}
                /><br/>
                <RaisedButton
                  label="facebook"
                  onTouchTap ={this.handleSocialLogin}
                  primary={true}
                  style ={styles.button}
                /><br/>

              </Formsy.Form>
              </div>
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
      </Paper>
    );
  }
});
