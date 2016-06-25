const {ActionAddShoppingCart} = mui.SvgIcons;
const {IconButton,FloatingActionButton,Snackbar,CircularProgress,FlatButton} = mui;

ProductTile = React.createClass({

  getInitialState: function() {
    return {
      openTooltipRequest: false,
      gotCartResponse: true,
      zoomed:false
    };
  },

  contextTypes: {
    router: React.PropTypes.object,
    token: React.PropTypes.object,
  },

  _handleTouchTap:function(e){
    this.props.onTouchTap(e.currentTarget.id.toString());
  },

  handleAddtoCart:function(e){

    this.setState({
      gotCartResponse: false
    });

    CartController.addItem(
      this.props.product.id,1,
      this.context.token.access_token,(err,response)=>{
        if(response.data.success){
          this.setState({
            openTooltipRequest: true,
            gotCartResponse: true
          });
        }else{
          throw new Meteor.error(200,'No se pudo agregar el producto');
        }
    });
  },

  handleTooltipRequestClose:function(){
    this.setState({
      openTooltipRequest: false
    });
  },

  onTouchTapImg:function(){
    this.setState({
      zoomed: !this.state.zoomed
    });

  },

  render: function() {
    //data-action={zoom} zoom de img
    const picHeight = this.props.picHeight?this.props.picHeight:240;
    //const productImg = this.props.zoom?'productImg zoomable':'productImg';
    const productImg = this.state.zoomed?'zoomed zoomable productImg':'zoomable productImg';
    return (
      <div className={'productContainer'}>
        <div className={'productImgContainer'}>
          <img
            id = {this.props.product.id}
            style={{cursor:'pointer'}}
            src={this.props.product.image}
            className={productImg}
            onTouchTap={this.onTouchTapImg}
          />
        </div>
        <div className={'productDataContainer'}  >
          <div className={'productTitle'}
            style={{cursor:'pointer'}}
            onTouchTap={this._handleTouchTap}
            id={this.props.product.id}>
            <h4 >{this.props.product.name}</h4>
          </div><hr/>
          <div className={'productCodeFullText'}>
            <span className={'productKey'}>Código: </span> <span>{this.props.product.sku}</span><br/>
          </div>
          <div className={'productDescription'}>
            {this.props.product.description}
          </div>
          <div className={'productPriceText'}>
            {'S/. '+this.props.product.price}
          </div>
          <div className={'productIcons'} >
            {this.state.gotCartResponse?(
              <FloatingActionButton
              mini={true}
              tooltip={"Agregar al carrito"}
              onTouchTap={this.handleAddtoCart}>
              <ActionAddShoppingCart/>
            </FloatingActionButton>
              ):(
              <CircularProgress
                size={0.5}
                tooltip = {"Cargando"}
              />
            )}
          </div>
        </div>
        <Snackbar
          open={this.state.openTooltipRequest}
          message={this.props.product.name+ ' agregado al carrito'}
          autoHideDuration={2000}
          onRequestClose={this.handleTooltipRequestClose}
        />
      </div>
    );
  }
});
