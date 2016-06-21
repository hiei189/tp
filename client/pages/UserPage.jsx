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
    width:'90%',
    minWidth:288,
    margin:'auto',
    maxWidth:612,
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


UserPage = React.createClass({
  contextTypes:{
    gotUser: React.PropTypes.bool,
    router:React.PropTypes.object,
    smallScreen:React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      gotUser: false,
      user: {},
      firstname:'',
      fbUser:false,
      showDialog: false,
      showError: false,
      disabledButton:true,
      password:'',
      repeatedPassword:'',
      year:'',
      month:'',
      day:''
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
        let user = Session.get('user');
        let date = new Date(user.dob);
        if(gotUser){
          this.setState({
            user: user,
            gotUser: true,
            fbUser: Session.get('fbUser'),
            year: (date.getFullYear()).toString(),
            month: (date.getMonth()+1).toString(),
            day: (date.getUTCDate()).toString()
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
    equalsFieldPasswordError: "Las contraseñas no coinciden",
    isMonthError:"No es un mes valido",
    isYearError:"No es año valido",
    isDayError:"No es un dia valido"
  },
  invalidForm:function(){
    this.setState({
      disabledButton:true
    });
  },

  onValid:function(){
    this.setState({
      disabledButton:false
    });
  },

  onFocusDate:function(){
    if(this.state.typeDate !== 'date') {this.setState({typeDate: 'date'})}
  },

  onBlurDate:function() {
    if(this.state.typeDate !== 'string') {this.setState({typeDate: 'string'})}
  },

  onValidSubmit:function(model){
    model.dob = utils.createDateFromDMY(model.day,model.month,model.year);
    const updateData=()=>{
      data.updateUserData(model,(res)=>{
      if(res.success){
        if(this.isMounted()){
          this.setState({
            showDialog:true,
            showError:false,
            user:model,
            gotUserUpdated:true
          });
          Session.set('user',model);
        }
      }else{
        if(this.isMounted()){
          this.setState({
            showDialog: true,
            showError:true,
            errorBackendMessages: res.error,
            gotUserUpdated:false
          });
        }
      }
    })};

    const {password,repeatedPassword} = model;

    const updatePassword= () => {data.updatePassword(password,repeatedPassword,
      (res)=>{
        if(res.success){
          if(this.isMounted()){
            this.setState({
              gotPassUpdated:true,
              password:'',
              repeatedPassword:''
            });
          }
        }
    })};


    if(password){
      this.setState({
        shouldWait2Responses: true
      });
      updateData();
      updatePassword();
    }else{
      this.setState({
        shouldWait2Responses:false
      });
      updateData();
    }

  },

  showDialog:function(){
    const {showDialog,showError,shouldWait2Responses,errorBackendMessages,gotPassUpdated,gotUserUpdated} = this.state;
    if(showDialog){
      if(showError){
        return (
          <DialogDefault onRequestClose={()=>this.setState({showDialog:false})} title={'Cuenta no actualizada'}>
            Hubieron errores actualizando tu cuenta:
            <ErrorMessages errorBackendMessages = {errorBackendMessages}/>
          </DialogDefault>
        );
      }else{
        if(shouldWait2Responses){
          if(gotPassUpdated && gotUserUpdated){
            return(
              <DialogDefault onRequestClose={()=>this.setState({showDialog:false,shouldWait2Responses:false})} title={'Cuenta actualizada'}>
                Tus datos y tu contraseña fueron actualizados correctamente!
              </DialogDefault>
            );
          }else{
            return null;
          }
        }else{
          return (<DialogDefault onRequestClose={()=>this.setState({showDialog:false})} title={'Cuenta actualizada'}>
            Tus datos fueron actualizados correctamente!
          </DialogDefault>);
        }
      }
    }
    return null;

  },

  render: function() {
    const {gotUser,user,showDialog,showError,errorBackendMessages,disabledButton, password,repeatedPassword,day,year,month} = this.state;
    const {isNumericError,isWordsError,isSpecialWordsError,isEmailError,minLength7Error,isExistyError,equalsFieldPasswordError,isDayError, isYearError,isMonthError} = this.errorMessages;
    const { smallScreen } = this.context;
    if(gotUser){
      return (
        <Paper style={styles.paperContainer} zDepth = {smallScreen?0:1}>
          {this.showDialog()}
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
                value = {day}
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
                value = {month}
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
                value = {year}
                inputStyle = {styles.inputDateField}
              />
            </div>
{/*
            <FormsyDate
              required
              floatingLabelText="Fecha de nacimiento"
              textFieldStyle = {styles.field}
              onFocus={this.onFocusDate}
              onBlur={this.onBlurDate}
              name = "dob"
              id = "dob"
              value = {user.dob}
            />*/}

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
              value={user.telephone}
              style = {styles.field}
            />
          {/*{this.state.fbUser?null:null} OJO AGREGAR*/}
            <FormsyText
              validations={{minLength:7}}
              validationErrors={{
                minLength: minLength7Error
              }}
              floatingLabelText="Nueva contraseña"
              textFieldStyle = {{width:'100%'}}
              name = 'password'
              id ='password'
              type="password"
              value={password}
              style = {styles.field}
            />

            <FormsyText
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
              value={repeatedPassword}
              style = {styles.field}
            />

            <RaisedButton
              label="Actualizar"
              primary={true}
              type = {'submit'}
              disabled = {disabledButton}
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
