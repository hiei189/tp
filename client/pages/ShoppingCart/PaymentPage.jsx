const Colors = mui.Styles.Colors;
const Countries = {"AF":"Afganist\u00e1n","AL":"Albania","DE":"Alemania","AD":"Andorra","AO":"Angola","AI":"Anguila","AQ":"Ant\u00e1rtida","AG":"Antigua y Barbuda","SA":"Arabia Saud\u00ed","DZ":"Argelia","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaiy\u00e1n","BS":"Bahamas","BD":"Banglad\u00e9s","BB":"Barbados","BH":"Bar\u00e9in","BE":"B\u00e9lgica","BZ":"Belice","BJ":"Ben\u00edn","BM":"Bermudas","BY":"Bielorrusia","BO":"Bolivia","BA":"Bosnia-Herzegovina","BW":"Botsuana","BR":"Brasil","BN":"Brun\u00e9i","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","BT":"But\u00e1n","CV":"Cabo Verde","KH":"Camboya","CM":"Camer\u00fan","CA":"Canad\u00e1","BQ":"Caribe neerland\u00e9s","QA":"Catar","EA":"Ceuta y Melilla","TD":"Chad","CL":"Chile","CN":"China","CY":"Chipre","VA":"Ciudad del Vaticano","CO":"Colombia","KM":"Comoras","KP":"Corea del Norte","KR":"Corea del Sur","CI":"Costa de Marfil","CR":"Costa Rica","HR":"Croacia","CU":"Cuba","CW":"Curazao","DG":"Diego Garc\u00eda","DK":"Dinamarca","DM":"Dominica","EC":"Ecuador","EG":"Egipto","SV":"El Salvador","AE":"Emiratos \u00c1rabes Unidos","ER":"Eritrea","SK":"Eslovaquia","SI":"Eslovenia","ES":"Espa\u00f1a","US":"Estados Unidos","EE":"Estonia","ET":"Etiop\u00eda","PH":"Filipinas","FI":"Finlandia","FJ":"Fiyi","FR":"Francia","GA":"Gab\u00f3n","GM":"Gambia","GE":"Georgia","GH":"Ghana","GI":"Gibraltar","GD":"Granada","GR":"Grecia","GL":"Groenlandia","GP":"Guadalupe","GU":"Guam","GT":"Guatemala","GF":"Guayana Francesa","GG":"Guernesey","GN":"Guinea","GQ":"Guinea Ecuatorial","GW":"Guinea-Bis\u00e1u","GY":"Guyana","HT":"Hait\u00ed","HN":"Honduras","HU":"Hungr\u00eda","IN":"India","ID":"Indonesia","IR":"Ir\u00e1n","IQ":"Iraq","IE":"Irlanda","CX":"Isla Christmas","AC":"Isla de la Ascensi\u00f3n","IM":"Isla de Man","NU":"Isla Niue","NF":"Isla Norfolk","IS":"Islandia","AX":"Islas \u00c5land","KY":"Islas Caim\u00e1n","IC":"islas Canarias","CC":"Islas Cocos","CK":"Islas Cook","FO":"Islas Feroe","GS":"Islas Georgia del Sur y Sandwich del Sur","FK":"Islas Malvinas","MP":"Islas Marianas del Norte","MH":"Islas Marshall","UM":"Islas menores alejadas de EE. UU.","PN":"Islas Pitcairn","SB":"Islas Salom\u00f3n","TC":"Islas Turcas y Caicos","VG":"Islas V\u00edrgenes Brit\u00e1nicas","VI":"Islas V\u00edrgenes de EE. UU.","IL":"Israel","IT":"Italia","JM":"Jamaica","JP":"Jap\u00f3n","JE":"Jersey","JO":"Jordania","KZ":"Kazajist\u00e1n","KE":"Kenia","KG":"Kirguist\u00e1n","KI":"Kiribati","XK":"Kosovo","KW":"Kuwait","LA":"Laos","LS":"Lesoto","LV":"Letonia","LB":"L\u00edbano","LR":"Liberia","LY":"Libia","LI":"Liechtenstein","LT":"Lituania","LU":"Luxemburgo","MK":"Macedonia","MG":"Madagascar","MY":"Malasia","MW":"Malaui","MV":"Maldivas","ML":"Mali","MT":"Malta","MA":"Marruecos","MQ":"Martinica","MU":"Mauricio","MR":"Mauritania","YT":"Mayotte","MX":"M\u00e9xico","FM":"Micronesia","MD":"Moldavia","MC":"M\u00f3naco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MZ":"Mozambique","MM":"Myanmar (Birmania)","NA":"Namibia","NR":"Nauru","NP":"Nepal","NI":"Nicaragua","NE":"N\u00edger","NG":"Nigeria","NO":"Noruega","NC":"Nueva Caledonia","NZ":"Nueva Zelanda","OM":"Om\u00e1n","NL":"Pa\u00edses Bajos","PK":"Pakist\u00e1n","PW":"Palau","PA":"Panam\u00e1","PG":"Pap\u00faa Nueva Guinea","PY":"Paraguay","PE":"Per\u00fa","PF":"Polinesia Francesa","PL":"Polonia","PT":"Portugal","PR":"Puerto Rico","HK":"RAE de Hong Kong (China)","MO":"RAE de Macao (China)","GB":"Reino Unido","CF":"Rep\u00fablica Centroafricana","CZ":"Rep\u00fablica Checa","CG":"Rep\u00fablica del Congo","CD":"Rep\u00fablica Democr\u00e1tica del Congo","DO":"Rep\u00fablica Dominicana","RE":"Reuni\u00f3n","RW":"Ruanda","RO":"Ruman\u00eda","RU":"Rusia","EH":"S\u00e1hara Occidental","WS":"Samoa","AS":"Samoa Americana","BL":"San Bartolom\u00e9","KN":"San Crist\u00f3bal y Nieves","SM":"San Marino","MF":"San Mart\u00edn","PM":"San Pedro y Miquel\u00f3n","VC":"San Vicente y las Granadinas","SH":"Santa Elena","LC":"Santa Luc\u00eda","ST":"Santo Tom\u00e9 y Pr\u00edncipe","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leona","SG":"Singapur","SX":"Sint Maarten","SY":"Siria","SO":"Somalia","LK":"Sri Lanka","SZ":"Suazilandia","ZA":"Sud\u00e1frica","SD":"Sud\u00e1n","SS":"Sud\u00e1n del Sur","SE":"Suecia","CH":"Suiza","SR":"Surinam","SJ":"Svalbard y Jan Mayen","TH":"Tailandia","TW":"Taiw\u00e1n","TZ":"Tanzania","TJ":"Tayikist\u00e1n","IO":"Territorio Brit\u00e1nico del Oc\u00e9ano \u00cdndico","TF":"Territorios Australes Franceses","PS":"Territorios Palestinos","TL":"Timor Oriental","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad y Tobago","TA":"Trist\u00e1n da Cunha","TN":"T\u00fanez","TM":"Turkmenist\u00e1n","TR":"Turqu\u00eda","TV":"Tuvalu","UA":"Ucrania","UG":"Uganda","UY":"Uruguay","UZ":"Uzbekist\u00e1n","VU":"Vanuatu","VE":"Venezuela","VN":"Vietnam","WF":"Wallis y Futuna","YE":"Yemen","DJ":"Yibuti","ZM":"Zambia","ZW":"Zimbabue"};
const {TextField, TimePicker, FlatButton, DropDownMenu, SelectField, DatePicker,RaisedButton,MenuItem,AutoComplete,CircularProgress,FloatingActionButton, RadioButton, RadioButtonGroup} = mui;

const styles = {
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
  fieldCreditcard: {
    margin: 'auto',
    width:'100%',
    minWidth:'212',
    backgroundImage:'url(/payment/tarjetas.png)',
    backgroundSize:'130px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition:'right'
  },
  fullFieldWithIcons:{
    margin: 'auto',
    width:'100%',
  },
  fieldWithIcons: {
    margin: 'auto',
    width:'calc(100% - 96px)',
  },
  fieldPrice: {
    margin: 'auto',
    width:'calc(100% - 88px)',
  },
  form:{
    margin: 'auto',
    width:'100%',
    display:'flex',
    flexDirection:'column'
  },
  goBackButton:{
    alignSelf:'flex-end',
    marginTop:'20px'
  },
  headers:{
    margin:'auto',
    width:'60%',
    textAlign:'center',
    color:Colors.pink500
  },
  containerPaymentOptions:{
    color:Colors.pink500,
    display: 'flex',
    flexDirection: 'column'
  },
  paymentOption:{
    display: 'flex',
    margin: '30px 0px',
    flexDirection: 'column',
    cursor:'pointer'
  },
  optionImg:{
    margin:'auto'
  },
  optionNote:{
    textAlign:'center'
  },
  paperTitle:{
    color: Colors.pink500,
    textAlign:'center'
  },
  labelSelectField:{
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    overflowY: 'hidden',
    overflowX: 'auto',
  },
}

PaymentPage = React.createClass({
  contextTypes:{

  },



  getInitialState: function() {
    return {
      number:'' ,
      selectedCountry: 'PE',
      methodCard: false,
      method:'NO_METHOD',
      gotPaypalData:false,
      paypal:{}
    };
  },

  componentWillMount: function() {


  },

  handleCountryMenu: function(event, selectedCountry, index) {
    this.setState({selectedCountry})
  },

  onValid:function(){

  },
  onInvalid:function(){

  },
  submit:function(){

  },

  handlePaypal:function(){
    formsController.payment.getPaypalInfo((res)=>{
      if(res.success){
        if(this.isMounted()){
          this.setState({
            paypal:res.paypal,
            gotPaypalData:true
          });
        }
      }
    });
  },

  selectMethodAgain:function(){
    this.setState({
      methodCard:false,
    });
  },

  handleCard:function(){
    this.setState({
      methodCard:true
    });
  },

  render: function() {

    const {methodCard,gotPaypalData,paypal} = this.state;

    return (
      <div style={{marginBottom:'20px'}}>
        {gotPaypalData?
          <Paypal inputs = {paypal} />:null}
        {methodCard?
          <CreditCard
            goBack = {this.selectMethodAgain}
            onValidSubmit={this.submit}
            onValid={this.onValid}
            ref = {'paymentForm'}
            onInvalid={this.onInvalid}/>:
            <div>
              <div>
                <h2 style={styles.paperTitle}>Metodos de Pago</h2>
              </div>
              <div style={styles.containerPaymentOptions}>
                <PaymentOption
                  handle = {this.handleCard}
                  img = {'/payment/tarjetas.png'}
                  note = {'Solo se aceptan tarjetas emitidas en Peru'}
                  />
                <PaymentOption
                  handle = {this.handlePaypal}
                  img = {'/payment/paypal.png'}
                  note = {'PayPal acepta tarjetas de todo el mundo'}
                  />
              </div>
            </div>
        }
      </div>

    );
  }

});

const PaymentOption = ({handle,img,note}) => {
  return (
    <div style={styles.paymentOption} onTouchTap={handle}>
      <img style={styles.optionImg} src={img}/>
      <span style={styles.optionNote}>{note}</span>
    </div>
  )
}

var Paypal = React.createClass({
  componentDidMount: function() {
    this.refs.paypalForm.submit();
  },

  loadPaypalInputs:function(){
    let i = 0;
    return utils.mapObject(this.props.inputs,(key,value)=>{
        i++;
        return <input key={i} type="hidden" name={key} value={value}/>
      });
  },

  render: function() {
    return (
      <form ref={'paypalForm'} action="https://www.paypal.com/cgi-bin/webscr" method="post" id="form_paypal">
        {this.loadPaypalInputs()}
      </form>
    );
  }

});


var CreditCard = React.createClass({
  errorMessages: {
    isNumeric:'Solo puedes ingresar números',
    isDefaultRequiredValue: 'Este campo es requerido',
    wordsError: "Solo use letras (a-z)"
  },
  componentWillMount: function() {
    let MenuCountries = Object.keys(Countries).map((code)=>{
      return <MenuItem key={code} value = {code} primaryText = {Countries[code]} />
    });
    this.setState({MenuCountries});
  },
  getInitialState: function() {
    return {
      selectedCreditcard: 'NUEVA TARJETA',
      noCreditcards:true,
      credicardLoading:true
    };
  },
  handleCreditcardChange:function(event,selectedCreditcard,index){
    this.setState({selectedCreditcard});
  },
  getCreditcards:function(){

  },
  render: function() {
    const {isNumeric,wordsError} = this.errorMessages;
    const { showIcons,selectedCreditcard } = this.state;
    return (
      <Formsy.Form
        onValidSubmit={this.props.submit}
        onValid={this.props.onValid}
        ref = {'paymentForm'}
        onInvalid={this.props.onInvalid}
        style ={styles.form}>
        <div>
          <h2 style={styles.paperTitle}>Tarjeta de credito</h2>
        </div>
        <FormsySelect
          name='selectedCreditcard'
          required
          labelStyle={styles.labelSelectField}
          onChange={this.handleCreditcardChange}
          style ={showIcons?styles.fieldWithIcons:styles.fullFieldWithIcons}
          fullWidth={true}
          floatingLabelText="Elige una tarjeta"
          value={selectedCreditcard}>
          <MenuItem value={'NUEVA TARJETA'} primaryText="Nueva tarjeta"/>
          {!this.state.credicardLoading && !this.state.noCreditcards?this.getCreditcards():<div/>}
        </FormsySelect>
        <FormsyText
          required
          floatingLabelText="Número"
          hintText = "Ingresa los 16 números"
          type="number"
          validations={{'isNumeric':true,isLength:16}}
          validationErrors={{
            isLength:"Deben ser 16 dígitos",
            isNumeric:isNumeric
          }}
          id ="ccnumber"
          name = "ccnumber"
          value={this.state.number}
          style ={styles.fieldCreditcard}
        />

        <FormsyText
          required
          floatingLabelText="Fecha de Expiración"
          hintText = "Ingresa la fecha de expiración"
          type="string"
          defaultValue = "__/__"
          id ="ccexpiration"
          name = "ccexpiration"
          value={this.state.expiration}
          style ={styles.field}
        />

        <FormsyText
          required
          floatingLabelText="Codigo de seguridad (CVV)"
          type="password"
          id ="cccvv"
          validations={{'isNumeric':true,isLength:3}}
          validationErrors={{isLength:'Deben ser 3 dígitos',isNumeric:isNumeric}}
          hintText = "Tres dígitos detrás de la tarjeta"
          name = "cccvv"
          value={this.state.code}
          style ={styles.field}
        />


        <FormsyText
          required
          floatingLabelText="Nombres"
          hintText = "Nombres de facturación"
          validations="isSpecialWords"
          validationErrors={wordsError}
          type="string"
          id ="ccfirstname"
          name = "ccfirstname"
          value={this.state.firstname}
          style ={styles.field}
        />

        <FormsyText
          required
          floatingLabelText="Apellidos"
          hintText = "Apellidos de facturación"
          validations="isSpecialWords"
          validationErrors = {wordsError}
          type="string"
          id ="cclastname"
          name = "cclastname"
          value={this.state.lastname}
          style ={styles.field}
        />

        <FormsySelect
          name='ccCountry'
          ref='ccCountry'
          required
          onChange={this.handleCountryMenu}
          style ={styles.field}
          floatingLabelText="País"
          value={this.state.selectedCountry}>
          {this.state.MenuCountries}
        </FormsySelect>

        <FormsyText
          required
          floatingLabelText="Región"
          hintText = "Región/Departamento de facturación"
          validations="isSpecialWords"
          validationErrors={wordsError}
          type="string"
          id ="ccRegion"
          name = "ccRegion"
          value={this.state.region}
          style ={styles.field}
        />

        <FormsyText
          required
          floatingLabelText="Ciudad"
          hintText = "Ciudad/Provincia de facturación"
          validations="isSpecialWords"
          validationErrors={wordsError}
          type="string"
          id ="ccCity"
          name = "ccCity"
          value={this.state.city}
          style ={styles.field}
        />

        <FormsyText
          required
          floatingLabelText="Código postal"
          hintText = "Código postal de facturación"
          validations="isAlphanumeric"
          type="string"
          id ="ccPostCode"
          name = "ccPostCode"
          value={this.state.postcode}
          style ={styles.field}
        />

      <FlatButton style={styles.goBackButton} primary={true} label="ATRAS" onTouchTap={this.props.goBack}/>


      </Formsy.Form>
    );
  }

});
