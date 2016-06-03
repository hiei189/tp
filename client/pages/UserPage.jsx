const {MapsLocalShipping,ActionHistory,ActionPayment} =mui.SvgIcons;
const {Paper,MenuItem,RaisedButton} = mui;
const Colors = mui.Styles.Colors;

const styles={
  icons:{
    margin:'auto',
    width:28,
    color:'white',
    height:28,
    fill: Colors.pink500
  },
  button:{
    margin: 'auto',
    width:'20%',
    minWidth:'212',
    marginTop:'12',
    display:'flex'
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
    width:'100%',
    marginBottom: 15
  },
  headers:{
    margin:'auto',
    width:'60%',
    textAlign:'center',
    color:Colors.pink500
  },
  paperContainer:{
    width:'50%',
    minWidth:288,
    margin:'auto',
    padding:'0 3%',
    marginTop:20,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
  },
  paperTitle:{
    color: Colors.pink500,
    textAlign:'center'
  },
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
      fbUser:false

    };
  },

  componentWillMount: function() {
    const {router} = this.context;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear()-100);
    Session.set('selectedItem','user');
    Session.set('pageTitle','Usuario');
    Tracker.autorun((a)=>{
      const gotUser = Session.get('gotUser');
      this.trackerId_a = a;
      Tracker.nonreactive(()=>{
        if(gotUser){
          this.setState({
            user: Session.get('user'),
            gotUser:true,
            fbUser: Session.get('fbUser')
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

  handleUserGenderMenu: function(event, gender, index) {
    this.setState({
      'user.gender': gender
    });
  },

  componentWillUnmount: function() {
    this.trackerId_a.stop();
  },

  errorMessages:{
    isNumericError:'Solo puedes ingresar números',
    isDefaultRequiredValue: 'Este campo es requerido',
    isWordsError: "Solo puede usar letras (a-z)",
    isSpecialWordsError: "Solo puede usar letras (a-z)",
    isEmailError: "Ingresa un email correcto",
    minLength7Error: "Debes ingresar más de siete caracteres",
    isExistyError:"Este campo es requerido",
    equalsFieldPasswordError: "Las contraseñas no coinciden"
  },
  invalidForm:function(){

  },

  onValid:function(model){
    console.log(model);
  },

  onFocusDate:function(){
    if(this.state.typeDate !== 'date') {this.setState({typeDate: 'date'})}
  },

  onBlurDate:function() {
    if(this.state.typeDate !== 'string') {this.setState({typeDate: 'string'})}
  },

  onValidSubmit:function(model){
    console.log(model);
  },

  render: function() {
    const {gotUser,user} = this.state;
    const {isNumericError,isWordsError,isSpecialWordsError,isEmailError,minLength7Error,isExistyError,equalsFieldPasswordError} = this.errorMessages;
    console.log(user);
    if(gotUser){
      return (
        <Paper style={styles.paperContainer}>
          <div>
            <h2 style={styles.paperTitle}>Datos de usuario</h2>
          </div>
        <div style={{marginBottom:'50px'}}>
          <Formsy.Form
            ref={'userForm'}
            onValid = {this.onValid}
            onValidSubmit={this.onValidSubmit}
            onInvalid = {this.invalidForm}
            style ={styles.form}>

            <FormsyText
              required
              validations={{'isSpecialWords':true}}
              validationErrors={{
                isSpecialWords: isSpecialWordsError
              }}
              floatingLabelText="Nombres"
              textFieldStyle = {{width:'100%'}}
              name = 'firstname'
              id ='firstname'
              value={user.firstname}
              style = {styles.field}
            />

            <FormsyText
              required
              floatingLabelText="Apellidos"
              validations={{'isSpecialWords':true}}
              validationErrors={{
                isSpecialWords: isSpecialWordsError
              }}
              textFieldStyle = {{width:'100%'}}
              name = 'lastname'
              id ='lastname'
              value={user.lastname}
              style = {styles.field}
            />

            <FormsyText
              required
              floatingLabelText="Fecha de nacimiento"
              textFieldStyle = {{width:'100%'}}
              style = {styles.field}
              type={this.state.typeDate}
              onFocus={this.onFocusDate}
              onBlur={this.onBlurDate}
              name = "birth"
              id = "birth"
              value = {user.birth}
            />

            <FormsySelect
              name = {'gender'}
              ref = {'gender'}
              required
              style={styles.field}
              value = {user.gender}
              floatingLabelText="Sexo"
              onChange={this.handleUserGenderMenu}>
              <MenuItem primaryText={'Hombre'} value={'M'}/>
              <MenuItem primaryText={'Mujer'} value={'F'}/>
            </FormsySelect>

            <FormsyText
              required
              validations={{'isEmail':true}}
              validationErrors={{
                isEmail: isEmailError
              }}
              floatingLabelText="Correo"
              textFieldStyle = {{width:'100%'}}
              name = 'email'
              id ='email'
              value={user.email}
              style = {styles.field}
            />

            <FormsyText
              required
              validations={{'isNumeric':true}}
              validationErrors={{
                isNumeric: isNumericError
              }}
              floatingLabelText="Telefono"
              textFieldStyle = {{width:'100%'}}
              name = 'telephone'
              id ='telephone'
              type="number"
              value={user.telephone}
              style = {styles.field}
            />
          {/*{this.state.fbUser?null:null} OJO AGREGAR*/}
            <FormsyText
              required
              validations={{minLength:7}}
              validationErrors={{
                minLength: minLength7Error
              }}
              floatingLabelText="Nueva contraseña"
              textFieldStyle = {{width:'100%'}}
              name = 'password'
              id ='password'
              type="password"
              value={user.password}
              style = {styles.field}
            />

            <FormsyText
              required
              validations={{minLength:7,equalsField:'password'}}
              validationErrors={{
                minLength: minLength7Error,
                equalsField: equalsFieldPasswordError
              }}
              floatingLabelText="Repite la nueva contraseña"
              textFieldStyle = {{width:'100%'}}
              name = 'repeatedPassword'
              id ='repeatedPassword'
              type="password"
              value={user.repeatedPassword}
              style = {styles.field}
            />

            <RaisedButton
              label="Actualizar"
              primary={true}
              type = {'submit'}
              disabled = {this.state.invalidUpdate}
              style ={styles.button}
            />
          </Formsy.Form>
        </div>
      </Paper>

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
