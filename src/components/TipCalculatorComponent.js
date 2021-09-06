import React from 'react';
import { Form, FormGroup, Input, Label, Button, Col, Container } from 'reactstrap';

class TipCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tipPercentage: 0,
      tipAmount: 0,
      roundUp: false,
      subTotal: 0,
      billTotal: 0,
      grandTotal: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.calculateTotal(
      {
        subTotal: parseFloat(this.subTotal.value),
        billTotal: parseFloat(this.billTotal.value),
        tipPercentage: parseFloat(this.tipPercentage.value),
        roundUp: this.roundUp.checked
      }
    );
  }

  calculateTotal({subTotal, billTotal, tipPercentage, roundUp}) {
    let tipAmount = parseFloat((subTotal * tipPercentage/100).toFixed(2));
    let grandTotal = tipAmount + billTotal;

    if (roundUp) {
      if (grandTotal !== Math.ceil(grandTotal)) {
        grandTotal = Math.ceil(grandTotal);
      }
      tipAmount = grandTotal - billTotal;
    }

    this.setState({
      subTotal: subTotal.toFixed(2),
      billTotal: billTotal.toFixed(2),
      tipPercentage,
      tipAmount: tipAmount.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    });
  }

  render() {
    return (
      <div>
        <h1>Tip Calculator</h1>
        <Container>
          <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col md={{size: 6, offset: 3}}>
                  <Label for="subTotal">Sub Total</Label>
                  <Input type="number" id="subTotal" name="subTotal"
                    innerRef={(input) => this.subTotal = input}
                    step="0.01"
                    pattern="([0-9]*[.])?[0-9]+"
                    ></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{size: 6, offset: 3}}>
                  <Label for="billTotal">Bill Total</Label>
                  <Input type="number" id="billTotal" name="billTotal"
                    innerRef={(input) => this.billTotal = input}
                    step="0.01"
                    ></Input>
                  </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{size: 6, offset: 3}}>
                  <Label for="tipPercentage">Tip Percentage</Label>
                  <Input type="number" id="tipPercentage" name="tipPercentage"
                    innerRef={(input) => this.tipPercentage = input}
                    ></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{size: 6, offset: 3}}>
                <Label for="roundUp">Round up?</Label>
                <Input className="m-1" type="checkbox" id="roundUp" name="roundUp"
                  innerRef={(checked) => this.roundUp = checked}
                  ></Input>
                </Col>
              </FormGroup>
            <Button className="m-1" color="primary">Submit</Button>
          </Form>
        </Container>
        <div className="container">
          <div className="row">
            <h2>Your Summary</h2>
            <p>Sub Total: ${this.state.subTotal}</p>
            <p>Bill Total: ${this.state.billTotal}</p>
            <p>Tip ({this.state.tipPercentage}%): ${this.state.tipAmount}</p>
            <p>Grand Total: ${this.state.grandTotal}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default TipCalculator;