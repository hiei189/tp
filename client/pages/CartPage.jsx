const {ContentSend} = mui.SvgIcons;
const { Paper, RaisedButton, CircularProgress,FloatingActionButton} = mui;
const Colors = mui.Styles.Colors;

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
  },
  footer:{
    position:'fixed',
    display:'flex',
    justifyContent:'flex-end',
    left:0,
    bottom:0,
    height:60,
    width:'100%',
    backgroundColor: Colors.grey100,
    minWidth: '100%',
    alignItems:'center'
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
    Session.set('selectedItem','shoppinCart');
    Tracker.autorun((d)=>{
      this.trackerId_d = d;
      this.screensize = Session.get('device-screensize');
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

    Tracker.autorun((c)=>{
      this.trackerId_c = c;
      if(Session.get('isShoppingCartEmpty')){
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
      this.context.router.push('/shipping');
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
              <div style={styles.footer}>
                <h3 style={{marginRight:16}} >{'TOTAL: '+ this.state.total}</h3>
                <FloatingActionButton onTouchTap = {this._handleBuy}>
                  <ContentSend />
                </FloatingActionButton>
              </div>
            </div>
          )}
        </div>
      );
  }
});

{/*<div style={styles.summary}>
  <div style={{position:this.state.positionSummary,height:'80%',overflowY:this.state.positionOverflowY}}>
    <h3> Detalle de compra </h3>
    {this.state.gotProducts?
      (<CartTable height={'300px'} items={this.state.products} total={this.state.total}/>):
    (null)}
    <RaisedButton
      primary={true}
      label={"COMPRAR"}
      style={{float:'right',marginTop:'32'}}
      onTouchTap={this._handleBuy}/>
  </div>
</div>*/}







var ProductTilesArray = React.createClass({

  componentWillMount: function() {
    Tracker.autorun((c)=>{
      this.trackerId = c;
      this.screensize = Session.get('device-screensize');
      switch(this.screensize){
        case "large":
        case "xlarge":
        case "xxlarge":
          this.setState({
            widthPaper: "calc(33.3% - 32px)"
          });
          break;
        case "medium":
          this.setState({
            widthPaper: "calc(50% - 32px)"
          });
          break;
        case "small":
          this.setState({
            widthPaper: "calc(100% - 32px)"
          });
          break;
      }
    });
  },

  componentWillUnmount: function() {
    this.trackerId.stop();
  },

  render: function() {
    styles.paper.width = this.state.widthPaper;
    return(
      <Paper style={styles.paper} zDepth={2} rounded={true}>
        <ProductCartTile
          id={this.props.product.id}
          key={this.props.product.id + 'inside'}
          product={this.props.product}
          zoom = {false}
          picHeight={180}>
        </ProductCartTile>
      </Paper>
    );
  }
});
