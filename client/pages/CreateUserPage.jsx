const { TextField, DatePicker, RadioButtonGroup,RadioButton,RaisedButton,Paper, Menu, MenuItem} = mui;
const Colors = mui.Styles.Colors;

const styles = {
  paperContainer:{
    width:'50%',
    minWidth:256,
    margin:'auto',
    padding:'0 3%',
    marginTop:20,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    textAlign:'center'
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
    minWidth:'212',
  },
  button:{
    margin: 'auto',
    width:'20%',
    minWidth:'212',
    marginTop:'12'
  },
  radiobutton:{
    flex:0.5,
    display:'flex'
  },
  radioContainer:{

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
    color:Colors.pink800
  },
  paperTitle:{
    color: Colors.pink500,
    textAlign:'center'
  },
}


CreateUserPage = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  contextTypes : {
    router: React.PropTypes.object
  },

  componentWillMount: function() {
    Session.set('pageT')

  },
  getInitialState: function() {
    this.error = {};
    this.error.name = '';
    return {
      userCreated:false,
      typeDate:'string'
    };
  },

  createUser:function(model){
    data.createUser(model,(res)=>{
      if(res.success){
        if(this.isMounted()){
          this.setState({
            userCreated: true,
            showError:false,
            showDialog:true
          });
        }
      }else{
        if(this.isMounted()){
          this.setState({
            showError: true,
            showDialog:true,
            errorBackendMessages: res.error
          });
        }
      }

    });
  },

  componentWillMount: function() {
    Session.set('pageTitle', 'Crear usuario');
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

  handleChange: function(e) {
    this.setState(
      {[e.currentTarget.id]:e.target.value}
    );
    },

  goHome:function(){
    this.context.router.push('/');
  },

  validForm:function(){
    this.setState({
      invalidCreateUser: false
    });
  },

  invalidForm:function(){
    this.setState({
      invalidCreateUser: true
    });
  },

  handleUserGenderMenu: function(event, gender, index) {
    this.setState({
      'gender': gender
    });
  },

  onFocusDate:function(){
    if(this.state.typeDate !== 'date') {this.setState({typeDate: 'date'})}
  },

  onBlurDate:function() {
    if(this.state.typeDate !== 'string') {this.setState({typeDate: 'string'})}
  },

  getErrorBackendMessages(){
    const {errorBackendMessages} = this.state;
    return Object.keys(errorBackendMessages).map((error)=>{
      const errorMessage = errorBackendMessages[error];
      return
      <li>
        {errorMessage}
      </li>
    })
  },

  render: function() {
    const {isNumericError,isWordsError,isSpecialWordsError,isEmailError,minLength7Error,isExistyError,equalsFieldPasswordError} = this.errorMessages;
    const {showDialog, showError,errorBackendMessages} = this.state;
    return (
      <Paper style={styles.paperContainer}>
        {showDialog?
          (showError?
          <DialogDefault
            onRequestClose = {()=>this.setState({
              showDialog:false
            })}
            title={'No se pudo crear tu cuenta!'}>
            Ocurrieron los siguientes errores al crear tu cuenta:
            <ErrorMessages errorBackendMessages = {errorBackendMessages} />
          </DialogDefault>
            :
          <DialogDefault
            title={'Bienvenido!, ' + this.state.firstname}
            onRequestClose={this.goHome}>
            Tu cuenta ha sido creada exitosamente!
          </DialogDefault>):null}

        <Formsy.Form
          onValidSubmit={this.createUser}
          onValid={this.validForm}
          ref = {'createForm'}
          onInvalid={this.invalidForm}
          style ={styles.form}>

          <h2 style={styles.paperTitle}>Datos personales</h2>
          <FormsyText
            required
            validations={{'isSpecialWords':true}}
            validationErrors={{
              isSpecialWords: isSpecialWordsError
            }}
            type="string"
            floatingLabelText="Nombres"
            textFieldStyle = {{width:'100%'}}
            id ="firstname"
            name = "firstname"
            value={this.state.firstname}
            style ={styles.field}
          />

          <FormsyText
            required
            floatingLabelText="Apellidos"
            validations={{'isSpecialWords':true}}
            validationErrors={{
              isSpecialWords: isSpecialWordsError
            }}
            textFieldStyle = {{width:'100%'}}
            type="string"
            id ="lastname"
            name = "lastname"
            value={this.state.lastname}
            style ={styles.field}
          />

          <FormsyText
            required
            floatingLabelText="Fecha de nacimiento"
            textFieldStyle = {{width:'100%'}}
            style = {styles.field}
            type={this.state.typeDate}
            onFocus={this.onFocusDate}
            onBlur={this.onBlurDate}
            name = "datebirth"
            id = "datebirth"
            value = {this.state.datebith}
          />

          <FormsySelect
            name = {'gender'}
            ref = {'gender'}
            required
            style={styles.field}
            value = {this.state.gender}
            floatingLabelText="Sexo"
            id = 'gender'
            onChange={this.handleUserGenderMenu}>
            <MenuItem primaryText={'Hombre'} value={'M'}/>
            <MenuItem primaryText={'Mujer'} value={'F'}/>
          </FormsySelect>

          <br/>
          <h2 style={styles.paperTitle}>Datos de contacto</h2>

          <FormsyText
            required
            validations={{'isEmail':true}}
            validationErrors={{
              isEmail: isEmailError
            }}
            floatingLabelText="Correo"
            textFieldStyle = {{width:'100%'}}
            name = 'email'
            type = 'email'
            id ='email'
            value={this.state.email}
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
            value={this.state.telephone}
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
            value={this.state.password}
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
            value={this.state.repeatedPassword}
            style = {styles.field}
          />
          <RaisedButton
            label="Crear usuario"
            primary={true}
            type = {'submit'}
            disabled = {this.state.invalidCreateUser}
            style ={styles.button}
          />
        </Formsy.Form>
      </Paper>
    );
  }

});
