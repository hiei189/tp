const {Dialog,FlatButton,RaisedButton} = mui;

const styles={
  root:{

  }
}

DialogDefault = React.createClass({
  contextTypes:{
    router:React.PropTypes.object,
  },
  getInitialState: function() {
    return {
      open: true
    };
  },

  handleOpen:function() {
    this.setState({open: true});
  },

  handleClose:function(){
    const { actions, onRequestClose,goback } = this.props;
    const { router } = this.context;
    this.setState({open: false});
    Session.set('showDialog',false);
    Session.set('DialogMessage','');
    Session.set('isAnErrorDialog',false);
    Session.set('DialogTitle','Tulipanda');
    Session.set('DialogShouldGoBack',false);
    Session.set('DialogAction','DO_NOTHING');


    if (onRequestClose){
      onRequestClose();
    }

    if(actions){
      switch (actions) {
        case 'GO_HOME':
          router.push('/');
          break;
        default:
          break;
      }
    }

    if(goback){
      router.goBack();
    }
  },


  render: function() {
    const actions =
      (<FlatButton
        label="Aceptar"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
       />)
       //actions = this.props.actions!=='DO_NOTHING'?this.props.actions:actions;
       const { error, message, title, children } = this.props;
    return (
      <Dialog
        open={this.state.open}
        style={styles.root}
        modal={false}
        actions = {actions}
        onRequestClose={this.handleClose}
        title={title}>
        {error?
          <div>
            Ocurrieron los siguientes errores:
            <ErrorMessages errorBackendMessages = {message} />
          </div>
          :message}
        {children?children:null}
      </Dialog>
    );
  }

});
