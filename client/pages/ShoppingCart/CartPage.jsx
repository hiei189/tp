const { Paper, RaisedButton, CircularProgress} = mui;

var styles = {
  paper:{
    overflow:'visible',
    height:'190',
    margin:16
  },
  container:{
    display: 'flex',
    flexWrap:'wrap',
    padding:8,
    flexDirection: 'row'
  },
  summary:{
    flex:1,
    paddingLeft:16,
    paddingRight:16,
    minWidth:300,
    fontFamily: 'Roboto, sans-serif',
    overflow:'auto'
  }
};


CartPage = React.createClass({

  contextTypes: {
    screensize: React.PropTypes.string,
    gotUser: React.PropTypes.bool,
    router:React.PropTypes.object
  },

  getInitialState: function() {
    return {
      gotDataProducts: false,
      productNotFound:false,
      products:'',
      positionSummary:'fixed',
      products:[],
      gotProducts:false,
      gotError:false,
      total: 'S/. 0.00',
      noProducts:true
    };
  },

  componentWillMount: function() {
    this.total = 0;

    Session.set('pageTitle','Carrito de compras');
    Session.set('selectedItem','shoppingCart');

    Tracker.autorun((d)=>{
      this.trackerId_d = d;
      this.screensize = Session.get('device-screensize');
      Tracker.nonreactive(()=>{
        switch (this.screensize) {
          case "large":
          case "xlarge":
          case "xxlarge":
            this.setState({
              positionSummary:'fixed',
              positionOverflowY:'auto'
            });
            break;
          case "small":
          case "medium":
            this.setState({
              positionSummary:'',
              positionOverflowY:''
            });
            break;
          default:
            this.setState({
              positionSummary:'fixed',
              positionOverflowY:'auto'
            });
        };
      });
    });

    Tracker.autorun((c)=>{
      this.trackerId_c = c;
      var isShoppingCartEmpty = Session.get('isShoppingCartEmpty');
      this.shoppingCart = Session.get('shoppingCart');
      Tracker.nonreactive(()=>{
        if(isShoppingCartEmpty){
          this.setState({
            noProducts: true
          });
        }else{
          this.shoppingCart = Session.get('shoppingCart'); //Leyendo carrito de compras
          this.setState({
            total: this.shoppingCart.totals[0].text,
            gotProducts: false,
            noProducts: false
          });
          let arrayProducts = [];
          this.shoppingCart.products.map((product)=>{
            arrayProducts = arrayProducts.concat(product);
          });
          this.setState({products: arrayProducts,gotProducts:true});
        }
      });
    });
  },

  componentWillUnmount: function() {
    this.trackerId_d.stop();
    this.trackerId_c.stop();
  },

  renderTiles:function(){
      return this.state.products.map((product)=>{
        return (<ProductTilesArray
          key={product.key}
          product={product} />) //product.qtyCart and product.name
      });
  },

  _handleBuy:function(){
    if(this.context.gotUser){
      this.context.router.push('/shoppingdetails');
    }
    else{
      this.context.router.push('/login');
    }
  },

  render: function() {
      return (
        <div>
          {this.state.noProducts?<div>Elige productos para poder comprarlos</div>:
            (
            <div style={{width:'100%'}}>
              <div style={{width:'100%'}}>
                <div style={styles.container}>
                  {this.renderTiles()}
                </div>
              </div>
              <Footer onSend = {this._handleBuy} total = {this.state.total} disabled={false}/>
            </div>
          )}
        </div>
      );
  }
});


const ProductTilesArray = ({product})=>{
  return(
    <Paper className={'productTile'} zDepth={2} rounded={true}>
      <ProductCartTile
        id={product.product_id}
        product={product}
        zoom = {false}
        picHeight={180}>
      </ProductCartTile>
    </Paper>
  );
}
