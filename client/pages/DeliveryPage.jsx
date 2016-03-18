const Colors = mui.Styles.Colors;
const { TextField, TimePicker, SelectField, DatePicker,RaisedButton,MenuItem,AutoComplete,CircularProgress} = mui;
const {ContentSave} = mui.SvgIcons;

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
    width:'60%',
    minWidth:'256'
  },
  form:{
    textAlign:'center'
  },
  headers:{
    margin:'auto',
    width:'60%',
    textAlign:'center',
    color:Colors.pink800
  }
}

DeliveryPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    this.placeFinished = 'NOT FINISHED';
    this.place_id = 'X';
    return {
      dateShipping:'',
      hourShipping:'',
      occasions:'',
      message:'',
      items: [],
      gotItems:false,
      total:'',
      noProducts:true,
      gotProducts:false,
      placesDataSource:['Ingresa un lugar'],
      addressesLoading: true
    };
  },
  componentWillMount: function() {
    this.error={};
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()+1);
    this.setState({
      dateShipping: this.maxDate
    });
  },

  render: function() {
    return (
      <div>
        <h2 style={styles.headers}>Datos de delivery</h2>
        <form style={styles.form}>
          <DatePicker
            floatingLabelText="Fecha de entrega"
            textFieldStyle = {{width:'100%'}}
            minDate = {this.minDate}
            maxDate = {this.maxDate}
            defaultDate={this.maxDate}
            valueLink={this.linkState('dateShipping')}
            style = {styles.field}
            errorText={this.error.dateShipping}
          /><br/>
          <TimePicker
            floatingLabelText="Hora de entrega"
            textFieldStyle = {{width:'100%'}}
            style = {styles.field}
            format="24hr"
            ref="picker24hr"
            onChange={this.handleChangeTimePicker12}
            errorText={this.error.hourShipping}
          /><br/>
          <TextField
            floatingLabelText="Motivo"
            type="string"
            id ="occasions"
            valueLink={this.linkState('occasions')}
            style ={styles.field}
            errorText={this.error.occasions}
          /><br/>
          <TextField
            floatingLabelText="Mensaje"
            type="string"
            id ="message"
            multiline={true}
            valueLink={this.linkState('message')}
            style ={styles.field}
            rows = {2}
            errorText={this.error.message}
          /><br/>
          <TextField
            floatingLabelText="Costo de envío"
            type="string"
            id ="priceShipping"
            multiline={true}
            valueLink={this.linkState('priceShipping')}
            style ={styles.field}
            errorText={this.error.priceShipping}
          /><br/>
          <RaisedButton
            primary={true}
            label={'Costo'}
            onTouchTap={this.calculatePriceShipping}/><br/>
          <RaisedButton
            icon={<ContentSave />}
            primary={true}
            label={'Guardar'}
            onTouchTap={this.next}/><br/>
        </form><br/>
      </div>
    );
  }

});
