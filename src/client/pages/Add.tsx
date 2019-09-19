import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ITag } from '../utils/interfaces';
import { json } from '../utils/api'

class Add extends React.Component<IAddProps, IAddState> {

    constructor(props: IAddProps) {
        super(props);
        this.state = {
            title: '',
            content: '',
            tags: [],
            selectedTag: "0"
        }
    }

    async handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const newBlog = {
            title: this.state.title,
            content: this.state.content,
            selectedTag: this.state.selectedTag
        }
        try {
            await json('/api/blogs', 'POST', (newBlog))
            // // const res = await fetch('/api/blogs' , {
            // //     method: 'POST',
            // //     headers: {
            // //         "Content-Type": "application/json"
            // //     },
            // //     body: JSON.stringify(newBlog)
            // });
            // if (res.ok) {
                this.props.history.push('/')
            // }
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        try {
            let res = await fetch(`/api/tags`)
            let data = await res.json()
            this.setState({ tags: data })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <form action="" >
                <div className="form-group m-4 border border-info p-3">
                <label className=" " htmlFor="title">Title:</label>
                <input className="form-control " type="text" value={this.state.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })} />
                <label htmlFor="">Tags</label>
                <select value={this.state.selectedTag} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ selectedTag: e.target.value })} className="form-control">
                    <option value="0">Select an Option...</option>
                    {this.state.tags.map(tag => {
                        return(
                            <option value={tag.id} key={`tag-${tag.id}`}>{tag.name}</option>
                        )
                    })}
                </select>
                <label className=" " htmlFor="content">Message:</label>
                <textarea className="form-control " rows={5} value={this.state.content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })} />
                <div className="row justify-content-center my-2">
                    <button className="btn btn-info col-md-8" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleClick(e)} >Add Blog Post!</button>
                </div>
                </div>
            </form>
        )
    }
}

export interface IAddProps extends RouteComponentProps<{id: string}>{}

export interface IAddState {
    title: string,
    content: string,
    tags: ITag[],
    selectedTag: string
}

export default Add;