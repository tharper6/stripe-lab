import * as React from 'react';
import BlogCard from '../Components/BlogCard';
import { IBlog } from '../utils/interfaces';
import { json } from '../utils/api'

class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            blogs: []
        }
    }

    async componentDidMount() {
        try {
            let blogs = await json('/api/blogs')
            // let res = await fetch(`/api/blogs`)
            // let data = await res.json()
            this.setState({ blogs })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <section className="row col-md-12 justify-content-center">
                {this.state.blogs.map(blog => {
                    return(
                        <BlogCard blogs={blog} key={blog.id} />
                    )
                })}
            </section>
        )
    }
}

export interface IHomeProps {}

export interface IHomeState {
    blogs: Array<IBlog>
}

export default Home;