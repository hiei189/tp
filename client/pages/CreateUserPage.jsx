const { TextField, DatePicker, RadioButtonGroup,RadioButton,RaisedButton,Paper} = mui;
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
  radiogroup:{
    margin:'auto',
    width:'60%',
    minWidth:'212',
    textAlign:'left'
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
    handleOpenLoginDialog: React.PropTypes.func,
    router: React.PropTypes.object
  },

  componentWillMount: function() {
    Session.set('pageT')

  },
  getInitialState: function() {
    this.error = {};
    this.error.name = '';
    return {
      name: '',
      lastname:'',
      address:'',
      city:'',
      email:'',
      telephone:'',
      password:'',
      passconfirm:'',
      birth:'',
      gender:'male',
      messageName:'',
      errorName:false,
      error:false,
      success:1,
      userCreated:false
    };
  },
  createUser:function(){

    error = this.validateData();
    if(Object.keys(error).length != 0) {
      this.forceUpdate();
      //return;
    }

    this.token = Session.get('token');

    backendCom.createUser(this.token.access_token,this.state.name,this.state.lastname,this.state.email,
    this.state.telephone,this.state.password,this.state.passconfirm,this.state.gender,
    callback = (err,response)=>{
      if(response.data.success){
        Session.set('user',response.data.data);
        if(this.isMounted()){
          this.setState({
            userCreated: true
          });
        }
      }else{

      }
    });
  },
  componentDidMount: function() {

  },
  validateData:function(){

    this.error={};
    if(this.state.name===''){
        this.error.name = "Este campo es necesario";
      }
    if(this.state.email==='')
      {
        this.error.email= "Este campo es necesario";
      }

    if(this.state.lastname==='')
      {

        this.error.lastname="Este campo es necesario";
      }

    if(this.state.telephone==='')
      {
        this.error.telephone= "Este campo es necesario";
      }

    if(this.state.password!==this.state.passconfirm)
      {
        this.error.password= "Las contraseñas no coinciden";
      }

      if(this.state.password=='')
        {
          this.error.password= "Este campo es necesario";
        }
      return(this.error);

  },
  componentWillMount: function() {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear()-80);
    this.maxDate.setFullYear(this.maxDate.getFullYear()-10);
    this.setState({
      birth: this.maxDate
    });
    Session.set('pageTitle', 'Crear usuario');
  },
  handleChange: function(e) {
    this.setState(
      {[e.currentTarget.id]:e.target.value}
    );
    },

  goHome:function(){
    this.context.router.push('/');
  },
  render: function() {
    return (
      <Paper style={styles.paperContainer}>
        {this.state.userCreated?
          (<DialogDefault
          title={'Bienvenido!'}
          onRequestClose={this.goHome}>
          Tu cuenta ha sido creada exitosamente!
        </DialogDefault>):null}
        <h2 style={styles.paperTitle}>Datos personales</h2>
        <form style={styles.form}>
          <TextField
            floatingLabelText="Nombres"
            type="string"
            id ="name"
            value={this.state.name}
            onChange={this.handleChange}
            style ={styles.field}
            errorText={this.error.name}
          /><br/>
          <TextField
            floatingLabelText="Apellidos"
            id ="lastname"
            value={this.state.lastname}
            type="string"
            onChange={this.handleChange}
            style ={styles.field}
            errorText={this.error.lastname}
          /><br/>
          <DatePicker
            floatingLabelText="Fecha de nacimiento"
            textFieldStyle = {{width:'100%'}}
            minDate = {this.minDate}
            maxDate = {this.maxDate}
            defaultDate={this.maxDate}
            valueLink={this.linkState('birth')}
            style = {styles.field}
            errorText={this.error.birth}
          /><br/>

          <RadioButtonGroup name="gender"
            value={this.state.gender}
            defaultSelected="M"
            id='gender'
            onChange={this.handleChange}
            style={styles.radiogroup}>
            <RadioButton
              value="M"
              label="Hombre"
            />
            <RadioButton
              value="F"
              label="Mujer"
            />
          </RadioButtonGroup>
          <br/>
          <h2 style={styles.paperTitle}>Datos de contacto</h2>
          <TextField
            floatingLabelText="Email"
            type="email"
            id='email'
            onChange={this.handleChange}
            value={this.state.email}
            style ={styles.field}
            errorText={this.error.email}
          /><br/>
          <TextField
            floatingLabelText="Teléfono"
            type="number"
            id='telephone'
            onChange={this.handleChange}
            value={this.state.telephone}
            style ={styles.field}
            errorText={this.error.telephone}
          /><br/>
          <TextField
            floatingLabelText="Contraseña"
            type="password"
            id='password'
            onChange={this.handleChange}
            value={this.state.password}
            style ={styles.field}
            errorText={this.error.password}
          /><br/>
          <TextField
            floatingLabelText="Repetir contraseña"
            type="password"
            id='passconfirm'
            value={this.state.passconfirm}
            onChange={this.handleChange}
            style ={styles.field}
            errorText={this.error.password}
          /><br/>
          <RaisedButton
            label="Crear usuario"
            primary={true}
            onTouchTap = {this.createUser}
            style ={styles.button}
          /><br/>
        </form>
      </Paper>
    );
  }

});
