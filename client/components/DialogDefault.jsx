const {Dialog,FlatButton,RaisedButton} = mui;

const styles={
  root:{

  }
}

DialogDefault = React.createClass({

  getInitialState: function() {
    return {
      open: true
    };
  },

  handleOpen:function() {
    this.setState({open: true});
  },

  handleClose:function(){
    this.setState({open: false});
    this.props.onRequestClose();
  },


  render: function() {
    const actions =
      (<FlatButton
        label="Aceptar"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
       />)
       this.props.actions?this.props.actions:actions;
    return (
      <Dialog
        open={this.state.open}
        style={styles.root}
        modal={false}
        actions = {actions}
        onRequestClose={this.handleClose}
        title={this.props.title}>
        {this.props.children}
      </Dialog>
    );
  }

});
