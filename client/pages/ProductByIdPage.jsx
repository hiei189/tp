var PropTypes = React.PropTypes;
const { Paper, FlatButton, Checkbox,Divider,RaisedButton, CircularProgress} = mui;

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
    Session.set('selectedItem','NONE');
    data.getProductById(this.props.params.productId,(err,response)=>{});
    this.trackProduct(this.props.params.productId);
  },

  trackProduct:function(productId){
    Tracker.autorun((a)=> {
      this.trackerId_a = a;
      const productData = Session.get('product' + productId.toString());
      Tracker.nonreactive(()=>{
        if (productData !== null && typeof productData === 'object'){
          this.validateData(productData);
        }
      });
    });
  },

  componentWillUnmount: function() {
    this.trackerId_a.stop();
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.params.productId !== this.props.params.productId){
      this.setState({
        gotDataProducts:false
      });
      this.trackerId_a.stop();
      this.trackProduct(nextProps.params.productId);
      data.getProductById(nextProps.params.productId,(err,response)=>{});
    }
  },

  validateData:function(response){
    if(response.success){
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
  },

  render: function() {
    return (
      <ProductByIdPagePresentation
        gotMainProduct = {this.state.gotMainProduct}
        productNotFound = {this.state.productNotFound}
        mainProduct = {this.state.mainProduct}/>
      );
  }
});

const ProductByIdPagePresentation = ({gotMainProduct,productNotFound,mainProduct}) =>{
    if (gotMainProduct && !productNotFound){
      return (
        <div style={styles.root}>
          <Paper style={styles.paper} zDepth={2} rounded={true}>
            <ProductTile
              zoom={true}
              product={mainProduct}
            />
          </Paper>
        </div>
      );
    }else if(!gotMainProduct){
      return (
        <div style={styles.loadingContainer}>
          <CircularProgress style={styles.loading}/>
        </div>
      )
    }else if(gotMainProduct && productNotFound){
      return(
        <div>Producto no encontrado!</div>
      );
    }
}

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
  },
  loading:{
    margin:'auto'
  },
  loadingContainer:{
    textAlign: 'center',
    marginTop: '50px'
  }
};
