import * as React from 'react';
import { json, SetAccessToken } from '../utils/api'
import { RouteComponentProps } from 'react-router-dom';


class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    async handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            let result = await json('/auth/login', 'POST', {
                email: this.state.email,
                password: this.state.password
            });

            if(result) {
                SetAccessToken(result.token, { userid: result.token, role: result.role });
                this.props.history.push('/')
            } else {
                console.log('Invalid Credentials')
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    render() {
        return (
            <section className="justify-content-center row">
                <form className="form-group col-md-8 border border-dark my-3 p-3" action="">
                    <label htmlFor="">Email:</label>
                    <input value={this.state.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })} className="form-control" type="text" />
                    <label htmlFor="">Password:</label>
                    <input value={this.state.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })} className="form-control" type="password" />
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleClick(e)} className="form-control btn btn-info mt-3">Login</button>
                </form>
            </section>
        )
    }
}

export interface ILoginProps extends RouteComponentProps<{id: string}>{}

export interface ILoginState {
    email: string,
    password: string
}

export default Login;