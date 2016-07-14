const { TextField, DatePicker, RadioButtonGroup,RadioButton,RaisedButton,Paper, Menu, MenuItem} = mui;
const Colors = mui.Styles.Colors;

const styles = {
  paperContainer:{
    width:'90%',
    minWidth:288,
    maxWidth:612,
    margin:'auto',
    padding:'0 3%',
    marginTop:20,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
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
    marginTop:'12',
    display:'flex'
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
  dateContainer:{
    display:'flex',
    justifyContent:'space-between',
    flexWrap:'wrap',
    width:'100%',
    minWidth:'212'
  },
  dateField:{
    width:'25%'
  },
  inputDateField:{
    textAlign:'center'
  }
}


CreateUserPage = React.createClass({

  contextTypes : {
    router: React.PropTypes.object,
    smallScreen: React.PropTypes.bool
  },

  componentWillMount: function() {
    Session.set('pageTitle','Crear usuario');
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

    model.datebirth = utils.createDateFromDMY(model.day,model.month,model.year);
    data.createUser(model,(res)=>{
      if(res.success){
        if(this.isMounted()){
          this.setState({
            userCreated: true,
            createdUser: res.data
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
    equalsFieldPasswordError: "Las contraseñas no coinciden",
    isMonthError:"No es un mes valido",
    isYearError:"No es año valido",
    isDayError:"No es un dia valido"
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

  render: function() {
    const {isNumericError,isMonthError,isWordsError,isSpecialWordsError,isEmailError,minLength7Error,isExistyError,equalsFieldPasswordError, isDayError, isYearError} = this.errorMessages;
    const { smallScreen } = this.context;
    return (
      <Paper style={styles.paperContainer} zDepth = {smallScreen?0:1}>
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
          <div className={'datebirthContainer'}>
            <span className={'datebirth'}>
              Fecha de nacimiento
            </span>
          </div>
        <div style={styles.dateContainer}>
          <FormsyText
            required
            floatingLabelText="Dia"
            validations={{isDay:true,'isNumeric':true}}
            validationErrors={{
              isDay: isDayError
            }}
            maxLength={2}
            textFieldStyle = {{width:'100%'}}
            name = "day"
            style ={styles.dateField}
            inputStyle = {styles.inputDateField}
          />


          <FormsyText
            required
            floatingLabelText="Mes"
            validations={{'isMonth':true,'isNumeric':true}}
            validationErrors={{
              isMonth: isMonthError
            }}
            maxLength={2}
            textFieldStyle = {{width:'100%'}}
            name = "month"
            style ={styles.dateField}
            inputStyle = {styles.inputDateField}
          />

          <FormsyText
            required
            floatingLabelText="Año"
            validations={{'isYear':true,'isNumeric':true}}
            validationErrors={{
              isYear: isYearError
            }}
            maxLength={4}
            textFieldStyle = {{width:'100%'}}
            name = "year"
            style ={styles.dateField}
            inputStyle = {styles.inputDateField}
          />
        </div>

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
