import * as React from 'react';
import { injectStripe, CardElement, ReactStripeElements } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';

class DonateForm extends React.Component<IDonateFormProps, IDonateFormState> {

    constructor(props: IDonateFormProps) {
        super(props);
        this.state = {
            name: "",
            amount: ""
        }
    }

    async handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            let {token} = await this.props.stripe.createToken({ name: this.state.name })
            console.log(token)
            let amount = this.state.amount
            await fetch('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ token, amount })
            })
            this.setState({
                name: '',
                amount: ''
            })
        } catch (error) {
            throw error;
        }
    }

    render() {
        return(
            <main className="container">
                <form className="form-group mt-3 border border-primary rounded shadow-lg p-2" onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => this.handleSubmit(e)} >
                    <label>Name:</label>
                    <input className="input-group my-1 p-1 border border-dark" type="text" value={this.state.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}/>
                    <label>Amount:</label>
                    <input className="input-group my-1 p-1 border border-dark" type="text" value={this.state.amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ amount: e.target.value })}/>
                    <label htmlFor="">Credit Card Info:</label>
                    <CardElement className="p-2 border border-dark" />
                    <button className="btn btn-primary border border-dark shadow mt-3">Charge It!</button>
                </form>
            </main>
        )
    }

}

interface IDonateFormProps extends ReactStripeElements.InjectedStripeProps {}
interface IDonateFormState {
    name: string,
    amount: string
}

export default injectStripe(DonateForm);