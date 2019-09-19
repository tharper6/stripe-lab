import * as React from 'react';
import { IBlog } from '../utils/interfaces'
import { Link } from 'react-router-dom';

const BlogCard: React.SFC<IBlogCardProps> = (props) => {
    return (
        <article className="col-md-8">
            <div className="card my-2">
                <div className="card-body text-center">
                    <h4>{props.blogs.title}</h4>
                    <p>{props.blogs.content.substring(0, 150)}...</p>
                    <Link className="btn btn-info" to={`/details/${props.blogs.id}`}>Details</Link>
                </div>
            </div>
        </article>
    )
}

export interface IBlogCardProps {
    blogs: IBlog
}

export default BlogCard;