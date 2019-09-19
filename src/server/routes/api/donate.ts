import * as express from 'express';
import * as stripeLoader from 'stripe';
import secretkey from '../../config/development'


const router = express.Router();

const stripe = new stripeLoader(secretkey.stripe.secretkey)

const charge = (token: string, amt: number) => {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'donations'
    })
}

router.post('/', async (req, res, next) => {
    try {
        let data = await charge(req.body.token.id, req.body.amount)
        console.log(data);
        res.json('Charged!')
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})


export default router;