const {TextField} = mui;

 var _setMuiComponentAndMaybeFocus = function(c) {
  if (c === this._muiComponent) return;

  this._muiComponent = c;

  if (c && typeof c.focus === 'function') {
    this.focus = () => c.focus();
  } else if (this.hasOwnProperty('focus')) {
    delete this.focus;
  }
}

FormsyText = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  handleChange: function handleChange(event) {
    if(this.getErrorMessage() != null){
      this.setValue(event.currentTarget.value);
      if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
    }
    else{
      if (this.isValidValue(event.target.value)) {
        this.setValue(event.target.value);
        if (this.props.onChange) this.props.onChange(event, event.target.value);
      }
      else{
        this.setState({
          _value: event.currentTarget.value,
          _isPristine: false
        });
        if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
      }
    }
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleEnterKeyDown: function handleEnterKeyDown(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onEnterKeyDown) this.props.onEnterKeyDown(event, event.currentTarget.value);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    return (
      <TextField
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        defaultValue={this.props.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.props.onFocus}
        onEnterKeyDown={this.handleEnterKeyDown}
        errorText={this.getErrorMessage()}
        value={this.getValue()}
      />
    );
  }
});
