const {Route, Router,IndexRoute,browserHistory} = ReactRouter;
Meteor.startup(function() {
    if (Meteor.isClient) {
      Session.set('pageTitle','Tulipanda');
      Session.set('cartshopNumber','0');
      Session.set('token',{});
      Session.set('user',{});
      Session.setDefault('isShoppingCartEmpty',true);
      injectTapEventPlugin();
      //const browserHistory = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();
      const Routes = (
        <Router  history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={ProductsByCategoryPage} />
            <Route path="/categories/:categoryId" component ={ProductsByCategoryPage}/>
            <Route path="/products/:productId" component ={ProductByIdPage}/>
            <Route path="/createuser" component ={CreateUserPage}/>
            <Route path="/login" component ={LoginPage}/>
            <Route path="/shoppingcart" component = {CartPage}/>
            <Route path="/shipping" component = {Shipping}/>
          </Route>
        </Router>
        );
      ReactDOM.render(Routes,document.getElementById('react-target'));
    }
  })
