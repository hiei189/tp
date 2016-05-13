const {MapsLocalShipping,ActionHistory,ActionPayment} =mui.SvgIcons;
const {Paper,MenuItem} = mui;
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

  render: function() {
    const {gotUser,user} = this.state;
    const {isNumericError,isWordsError,isSpecialWordsError,isEmailError,minLength7Error,isExistyError,equalsFieldPasswordError} = this.errorMessages;

    if(gotUser){
      return (
        <Paper style={styles.paperContainer}>
          <div>
            <h2 style={styles.paperTitle}>Datos de usuario</h2>
          </div>
        <div style={{marginBottom:'50px'}}>
          <Formsy.Form
            ref={'userForm'}
            onValidSubmit={this.submitUserForm}
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
              name = 'userFirstname'
              id ='userFirstname'
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
              name = 'userLastname'
              id ='userLastname'
              value={user.lastname}
              style = {styles.field}
            />

            <FormsyDate
              required
              floatingLabelText="Fecha de nacimiento"
              textFieldStyle = {{width:'100%'}}
              minDate = {this.minDate}
              maxDate = {this.maxDate}
              name = 'userBirth'
              defaultDate={this.maxDate}
              value={user.birth}
              style = {styles.field}
            />

            <FormsySelect
              name = {'userGender'}
              ref = {'userGender'}
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
              name = 'userEmail'
              id ='userEmail'
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
              name = 'userTelephone'
              id ='userTelephone'
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
              name = 'userPassword'
              id ='userPassword'
              type="password"
              value={user.password}
              style = {styles.field}
            />

            <FormsyText
              required
              validations={{minLength:7,equalsField:'userPassword'}}
              validationErrors={{
                minLength: minLength7Error,
                equalsField: equalsFieldPasswordError
              }}
              floatingLabelText="Repite la nueva contraseña"
              textFieldStyle = {{width:'100%'}}
              name = 'userRepeatedPassword'
              id ='userRepeatedPassword'
              type="password"
              value={user.repeatedPassword}
              style = {styles.field}
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
