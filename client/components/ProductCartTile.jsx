const {ContentAdd,ContentRemove,ContentClear} = mui.SvgIcons;
const {IconButton,FloatingActionButton,Snackbar,TextField,FlatButton,CircularProgress} = mui;
const Colors = mui.Styles.Colors;

ProductCartTile = React.createClass({
  getInitialState: function() {
    return {
      openRequest: false
    };
  },

  contextTypes: {
    router: React.PropTypes.object,
    token: React.PropTypes.object
  },

  _handleTouchTap:function(e){
    this.context.router.push('/products/'+e.currentTarget.id.toString());
  },

  handleRequestClose:function(){
    this.setState({
      openRequest: false
    });
  },
  removeItem:function(){
    this.setState({
      isAppLoading: true
    });
    CartController.removeItem(
      this.props.product.key,
      this.context.token.access_token,
      (err,response)=>{
        if(response.data.success){
          this.setState({ //CORREGIR LOS ESTADOS
            gotCartResponse: true,
            isAppLoading: false
          });
        }else{
          throw new Meteor.Error(302,'No se pudo agregar el producto');
        }
      }
    );
  },
  removeOneItem:function(){
    this.setState({
      isAppLoading: true
    });
    CartController.removeOneItem(
      this.props.product.key,
      this.props.product.quantity,
      this.context.token.access_token,
      (err,response)=>{
        if(response.data.success){
          this.setState({ //CORREGIR LOS ESTADOS
            gotCartResponse: true,
            isAppLoading:false
          });
        }
      });
  },
  addItem:function(){
    this.setState({
      isAppLoading: true
    });
    CartController.addItem(
      this.props.product.product_id,1,
      this.context.token.access_token,
      (err,response)=>{
        if(response.data.success){
          this.setState({ //CORREGIR LOS ESTADOS
            gotCartResponse: true,
            isAppLoading:false
          });
        }else{
          throw new Meteor.Error(302,'No se pudo agregar el producto');
        }
      });
  },

  render: function() {
    const picHeight = this.props.picHeight?this.props.picHeight:240;
    const zoom = this.props.zoom?'zoom':'';
    const onTouchTap = this.props.onTouchTap?this.props.onTouchTap:'';
    return (
      <div className={'productContainer'}>
        <div className={'productImgContainer'}>
          <img
            id = {this.props.product.key+'img'}
            className={'productImg'}
            src={this.props.product.thumb}
            data-action={zoom}/>
        </div>
        <div className={'productDataContainer'}>
          <div className={'productTitle'}
            onTouchTap={this._handleTouchTap}
            id={this.props.id}>
            <h4>{this.props.product.name}</h4>
          </div><hr/>
          <div className={'productDescription'}>
              <span className={'productKey'}> {'Cantidad:' }</span>
              <div className={'productCartQtyContent'}>
                <FlatButton
                  className={'productCartQtyIcons'}
                  onTouchTap={this.removeOneItem}
                  primary={true}>
                  <ContentRemove color={Colors.pink800} className={'productCartQtyIcon'}/>
                </FlatButton>
                <span className={'productCartQty'}>
                  {this.props.product.quantity}
                </span>
                <FlatButton
                  className={'productCartQtyIcons'}
                  primary={true}
                  onTouchTap={this.addItem}>
                  <ContentAdd color={Colors.pink800} className={'productCartQtyIcon'}/>
                </FlatButton>
            </div>
            <br/>
            <span className={'productKey'}>{'Precio: '}</span>
            {this.props.product.total}
          </div>
          <div className={'productIcons'}>
            {this.state.isAppLoading?(
              <CircularProgress
              size={0.5}
              className = {'ProductIconProgress'}
              tooltip = {"Cargando"}/>
              ):(
              <FloatingActionButton
                mini={true}
                tooltip={"Eliminar del carrito"}
                onTouchTap={this.removeItem}>
                <ContentClear/>
              </FloatingActionButton>
            )}
          </div>
        </div>
        <Snackbar
          open={this.state.openRequest}
          message={this.props.product.name+ ' removido del carrito'}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }

});
