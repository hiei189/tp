const {DatePicker} = mui;

var _setMuiComponentAndMaybeFocus = function(c) {
 if (c === this._muiComponent) return;

 this._muiComponent = c;

 if (c && typeof c.focus === 'function') {
   this.focus = () => c.focus();
 } else if (this.hasOwnProperty('focus')) {
   delete this.focus;
 }
}

FormsyDate = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    return (
      <DatePicker
        // Sets the default date format to be ISO8601 (YYYY-MM-DD), accounting for current timezone
        formatDate={(date) => (new Date(date.toDateString()+" 12:00:00 +0000")).toISOString().substring(0,10)}
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        defaultValue={this.props.value}
        onChange={this.handleValueChange}
        errorText={this.getErrorMessage()}
        value={this.getValue()}
      />
    );
  }
});
