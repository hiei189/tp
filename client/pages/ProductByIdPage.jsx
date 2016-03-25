var PropTypes = React.PropTypes;
const { Paper, FlatButton, Checkbox,Divider,RaisedButton} = mui;

ProductByIdPage = React.createClass({
  getInitialState: function() {
    return {
      gotDataProducts: false,
      gotMainProduct:false,
      mainProduct:'',
      products:'',
      productsNotFound:false
    };
  },

  componentWillMount: function() {
    this.token = Session.get('token');
    backendCom.getProductById(this.token.access_token,this.props.params.productId,(err,response)=>{
      this.validateData(err,response);
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.params.productId !== this.props.params.productId){
      this.setState({
        gotDataProducts:false
      });
      backendCom.getProductById(this.token.access_token,nextProps.params.productId,(err,response)=>{
        if(this.isMounted()){
          this.validateData(err,response);
        }
      });
    }
  },

  validateData:function(err,response){
    if(!err){
      if(response.data.success){
        console.log(response.data);
        this.setState({
          products: '',
          mainProduct:response.data,
          gotDataProducts:false,
          gotMainProduct:true,
          productsNotFound:false
        });
      }else{
        this.setState({
          gotDataProducts:true,
          gotMainProduct:true,
          productsNotFound: true
        });
      }
    }else{
      throw new Meteor.Error('200','Lost Connection to the server');
    }
  },

  getCategories:function(data){
    var category =  data.category.map((category)=>{
      return category.name
    });
    return category.toString();
  },

  render: function() {

    if (this.state.gotMainProduct && !this.state.productNotFound){
      return (
        <div style={styles.root}>
          <Paper style={styles.paper} zDepth={2} rounded={true}>
            <ProductTile
              zoom={true}
              product={this.state.mainProduct.data}
            />
          </Paper>
        </div>
      );
    }else if(!this.state.gotMainProduct){
      return null
    }else if(this.state.gotMainProduct && this.state.productNotFound){
      return(
        <div>Producto no encontrado!</div>
      )
    }

  }

});

const styles={
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding:8
  },
  paper:{
    overflow:'visible',
    width:'480',
  }
};
