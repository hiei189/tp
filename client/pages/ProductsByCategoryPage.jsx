const { Paper, Dialog, Checkbox,Divider,RaisedButton,Tabs,Tab,CircularProgress} = mui;
const Colors = mui.Styles.Colors;
var styles = {
  root: {
    display: 'flex',
    padding:8,
  },
  container:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    alignContent:'flex-start',
    width : '100%'
  }
};


ProductsByCategoryPage = React.createClass({
  // mixins : [InfiniteScrollMixin],

  contextTypes: {
    screensize: React.PropTypes.string,
    token:React.PropTypes.object,
    router: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      gotDataProducts: false,
      products:[],
      productsLoaded:0
    };
  },

  componentWillMount: function() {
    this.categories = Session.get('categories');
    if(typeof this.props.params.categoryId === 'undefined'){
      this.props.params.categoryId = '25';
      this.selectedCategory = this.props.params.categoryId;
      Session.set('selectedItem','25');
    };
    this.token = this.context.token;
    this.getCategories(this.props);
    this.selectedCategory = this.props.params.categoryId;
  },

  validateData:function(response){
    if(response.success){
      this.setState({
        products:this.state.products.concat(response.data),
        gotDataProducts:true,
        productNotFound:false
      });
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.params.categoryId!==nextProps.params.categoryId){
      this.selectedCategory = nextProps.params.categoryId;
      this.nextPage = 1;
      this.setState({
        products: []
      });
      this.getCategories(nextProps);
    }
  },

  getCategories:function(nextProps){
        //retorno o el child o el parent en caso de cambio de screensize
        this.selectedCategoryObject = this.categories.find((category,idx,arr)=>{
          if(category.categories){
            let childCategory = category.categories.find((category,idx,arr)=>{
              return category.category_id === nextProps.params.categoryId;
            });
            if (typeof childCategory !== 'undefined') {
              return childCategory
            };
          }
          return category.category_id === nextProps.params.categoryId;
        });

        if(this.selectedCategoryObject.categories){
          data.getProductsByCategory(nextProps.params.categoryId,(err,response)=>{});
          this.selectedCategoryObject.categories.map((category)=>{
            data.getProductsByCategory(category.category_id,(err,response)=>{});
          });
        }else{
          data.getProductsByCategory(nextProps.params.categoryId,(err,response)=>{});
        }
  },
  fetchNextPage:function(nextPage){
    data.getProductsByCategoryLimited(
      this.selectedCategory,
      nextPage,(response)=>{
        this.validateData(response);
    });
  },

  renderTiles:function(){

      return(
        <ProductsComponent
          categoryId = {this.selectedCategory}
          />
      )

  },

  resetInfinite:function(){
    this.nextPage = 1;
    //this.fetchNextPage(this.nextPage);
  },

  getDesktopTabs:function(){
    if(this.selectedCategoryObject.categories){
        let ProductsArray = this.selectedCategoryObject.categories.map((category)=>{
          return(
            <Tab key={category.category_id} label={category.name}>
              <ProductsComponent categoryId = {category.category_id} />
            </Tab>
          );
        });
        return <Tabs tabItemContainerStyle={{color:Colors.pink500}}>{ProductsArray}</Tabs>
    }else{
        return <ProductsComponent categoryId = {this.selectedCategoryObject.category_id} />
    }
  },

  render: function() {
    const {screensize} = this.context
    const {params} = this.props;
    const smallScreen = screensize === 'small' || screensize === 'medium';
    smallScreen? Session.set('selectedItem',params.categoryId):Session.set('selectedItem',this.selectedCategoryObject.category_id);
      switch (screensize) {
        case 'small':
        case 'medium':
          return (
              <div style={styles.root} className={'ProductsByCategoryPage'} >
                <div style={styles.container}>
                  {this.renderTiles()}
                </div>
              </div>
          );
          break;
        case 'large':
        case 'xlarge':
        case 'xxlarge':
          return this.getDesktopTabs()
          break;
        default:
      }
  }
});


var ProductsComponent = React.createClass({
  contextTypes:{
    router: React.PropTypes.object
  },
  componentWillMount: function() {
    const {categoryId} = this.props;
    Tracker.autorun((a)=>{
      const products = Session.get('Category'+categoryId.toString());
      Tracker.nonreactive(()=>{
        this.trackerId_a = a;
        if (typeof products === 'undefined' ){
          this.setState({
            products: 'LOADING'
          });
        }else{
          this.setState({
            products: products
          });
        }
      });
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.categoryId !== this.props.categoryId){
      const {categoryId} = nextProps;
      this.trackerId_a.stop();
      Tracker.autorun((a)=>{
        this.trackerId_a = a;
        const products = Session.get('Category'+categoryId.toString());
        Tracker.nonreactive(()=>{
          if (typeof products === 'undefined' ){
            this.setState({
              products: 'LOADING'
            });
          }else{
            this.setState({
              products: products
            });
          }
        });
      });
    }
  },

  componentWillUnmount: function() {
    if(this.trackerId_a){
      this.trackerId_a.stop();
    }
  },

  getInitialState: function() {
    const products = Session.get('Category'+this.props.categoryId.toString());
    if (typeof products === 'undefined' ){
      return {
        products: 'LOADING'
      };
    }else{
      return {
        products: products
      };
    }
  },

  render: function() {
    const {categoryId} = this.props;
    const {products} = this.state;
    return(
      <ProductsByCategoryPagePresentation
        products = {products}
        router = {this.context.router}/>
    );
  }
});

const ProductsByCategoryPagePresentation = ({products,router})=>{
  if(products !== null && typeof products === 'object'){
    if(products.success){
      return (
        <div style={styles.root} className={'ProductsByCategoryPage'} >
          <div style={styles.container}>
            {
              products.data.map((product)=>{
                return(
                  <ProductTilesArray
                    router={router}
                    key={product.id}
                    product={product} />
                );
              })
            }
          </div>
        </div>
      );
    }else{
      return <div style={styles.root} className={'ProductsByCategoryPage'} >
        Aún no hay productos en esta categoría!
      </div>
    }
  }else if(products === 'ERROR'){
    <div style={styles.root} className={'ProductsByCategoryPage'} >
      Hubo un error obteniendo la información.
    </div>
  }else if(products === 'LOADING'){
    return <div style={{textAlign:'center',margin:'150px auto 0 auto'}}>
      <CircularProgress/>
    </div>
  }else{
    return <div style={{textAlign:'center',marginTop:'50%'}}>
    </div>
  }
};

const ProductTilesArray = ({product,router})=>{
  return(
    <Paper className={'productTile'} zDepth={2} rounded={true}>
      <ProductTile
        id={product.id}
        onTouchTap={(e)=>router.push('/products/'+e)}
        product={product}
        zoom = {false}
        picHeight={180}>
      </ProductTile>
    </Paper>
  );
}
