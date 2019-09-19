import * as React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import DonateForm from '../Components/DonateForm';
import publickey from '../../server/config/development'

class Donate extends React.Component<IDonateProps, IDonateState> {

    render() {
        return (
            <>
            <StripeProvider apiKey={publickey.stripe.publickey}>
                <Elements>
                    <DonateForm />
                </Elements>
            </StripeProvider>
            </>
        )
    }
}

export interface IDonateProps {}

export interface IDonateState {}

export default Donate;