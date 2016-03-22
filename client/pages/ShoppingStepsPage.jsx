const {Stepper,HorizontalStep,Paper,RaisedButton,FlatButton,FontIcon} = mui;
console.log(mui);
ShoppingStepsPage = React.createClass({
  contextTypes:{
    user: React.PropTypes.object,
    gotUser: React.PropTypes.bool
  },
  getInitialState:function() {
    return {
      activeStep: -1,
      lastActiveStep: 0,
    };
  },

  selectStep:function(currentStep) {
    const {
      lastActiveStep,
      activeStep,
    } = this.state;

    if (currentStep > lastActiveStep) {
      return;
    }

    this.setState({
      activeStep: currentStep,
      lastActiveStep: Math.max(lastActiveStep, activeStep),
    });
  },
  updateCompletedSteps:function (currentStep) {
    return currentStep < this.state.lastActiveStep;
  },

  continue:function() {
    const {
      activeStep,
      lastActiveStep,
    } = this.state;

    this.setState({
      activeStep: activeStep + 1,
      lastActiveStep: Math.max(lastActiveStep, activeStep + 1),
    });
  },

  createIcon:function(step) {
    if (step.props.isCompleted) {
      return (
        <FontIcon className="material-icons" style={{fontSize: 14}}>
          done
        </FontIcon>
      );
    }
    return <span>{step.props.orderStepLabel}</span>;
  },

  render: function() {
    return (<Paper style={{width: 500, margin: 'auto'}}>
      <div style={{
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
      }}
      >
        Material-UI User Group Registration
      </div>
      <Stepper
        horizontal={true}
        activeStep={this.state.activeStep}
        onStepHeaderTouch={this.selectStep}
        updateCompletedStatus={this.updateCompletedSteps}
        createIcon={this.createIcon}
      >
        <HorizontalStep
          orderStepLabel="1"
          stepLabel="User account"
          actions={[
            <RaisedButton
            key={0}
            label="Continue"
            primary={true}
            onClick={this.continue}
          />,
            <FlatButton key={1} label="Cancel" />,
          ]}
        >
          <div style={{padding: 20}}>
            {this.context.gotUser?<h4>{'Ya posees una cuenta'}</h4>:'Logueate o crea una cuenta'}
          </div>
        </HorizontalStep>
        <HorizontalStep
          orderStepLabel="2"
          stepLabel="Event registration"
          actions={[
            <RaisedButton
            key={0}
            label="Continue"
            primary={true}
            onClick={this.continue}
          />,
            <FlatButton key={1} label="Cancel" />,
          ]}
        >
          <div style={{padding: 20}}>
            <Shipping footer={false}/>
          </div>
        </HorizontalStep>

        <HorizontalStep
          orderStepLabel="3"
          stepLabel="Payment"
          actions={[
            <RaisedButton
            key={0}
            label="Finish"
            primary={true}
            onClick={this.continue}
          />,
            <FlatButton key={1} label="Cancel" />,
          ]}
        >
          <div style={{padding: 20}}>
            <DeliveryPage footer={false} />
          </div>
        </HorizontalStep>
      </Stepper>
      </Paper>
    );
  }

});
