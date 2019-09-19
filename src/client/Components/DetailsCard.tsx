import * as React from 'react';
import * as moment from 'moment';
import { IBlog } from '../utils/interfaces';
import { Link } from 'react-router-dom';
import { ITag } from '../utils/interfaces';


const DetailsCard: React.SFC<IDetailsCardProps> = (props) => {
    return (
        <article className="col-md-10">
            <div className="card my-2">
                <div className="card-body text-center">
                    <h4>{props.blogs.title}</h4>
                    <div className="d-flex justify-content-center align-items-center">{props.blogtags.map(blogtag => {
                        return(
                          <span className="badge badge-dark mx-3 p-2">{blogtag.name}</span>  
                        )
                    })}</div>
                    <p>{props.blogs.content.split('\n').map((item, i) => (
                        <span key={`item-${i}`}>
                            {item}
                            <br />
                        </span>
                    ))}</p>
                    <div className="card-footer my-0">
                        {moment(props.blogs._created).format("MMM Do YYYY")}
                    </div>
                </div>
            </div>
            <div className="row justify-content-around">
                <Link className="btn btn-info" to={`/edit/${props.blogs.id}`} >Edit/Delete</Link>
            </div>
        </article>
    )
}

export interface IDetailsCardProps {
    blogs: IBlog
    blogtags: ITag[]
}

export default DetailsCard;