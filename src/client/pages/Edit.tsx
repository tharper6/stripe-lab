import * as React from 'react';
import { RouteComponentProps } from 'react-router';

class Edit extends React.Component<IEditProps, IEditState> {

    constructor(props:IEditProps) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }

    async handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            const res = await fetch(`/api/blogs/${this.props.match.params.id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                this.props.history.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    async handleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        let editedBlog = {
            title: this.state.title,
            content: this.state.content
        }
        try {
            const res = await fetch(`/api/blogs/${this.props.match.params.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedBlog)
            });
            if(res.ok) {
                {this.props.history.push('/')}
            }
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        try {
            let res = await fetch (`/api/blogs/${this.props.match.params.id}`)
            let data = await res.json();
            this.setState({ 
                title: data.title,
                content: data.content
             })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <form className="form-group border border-dark p-2 my-2" action="">
                <label htmlFor="">Title:</label>
                <input className="form-control" type="text" value={this.state.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })} />
                <label htmlFor="">Message:</label>
                <input className="form-control" type="text" value={this.state.content} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ content: e.target.value })} />
                <div className="row justify-content-around border border-light p-2" >
                    <button className="btn btn-info" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleEdit(e)} >Edit</button>
                    <button className="btn btn-danger" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleDelete(e)} >Delete</button>
                </div>
            </form>
        )
    }
}

export interface IEditProps extends RouteComponentProps<{id: string}> {}

export interface IEditState {
    title: string,
    content: string
}

export default Edit;