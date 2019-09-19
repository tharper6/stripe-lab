import * as React from 'react';
import DetailsCard from '../Components/DetailsCard'
import { IBlog } from '../utils/interfaces';
import { RouteComponentProps } from 'react-router';
import { ITag } from '../utils/interfaces';
import { json } from '../utils/api';

class DetailsPage extends React.Component<DetailsProps, DetailsState> {

    constructor(props: DetailsProps) {
        super(props);
        this.state = {
            blogs: {
                id: 0,
                title: '',
                content: '',
                authorid: 0,
                _created: new Date()
            },
            blogtags: []
        }
    }

    async componentDidMount() {
        try {
            let data = await json(`/api/blogs/${this.props.match.params.id}`)
            let data2 = await json(`/api/blogtag/${this.props.match.params.id}`)
            // let res = await fetch(`/api/blogs/${this.props.match.params.id}`)
            // let data = await res.json();
            // let res2 = await fetch(`/api/blogtag/${this.props.match.params.id}`)
            // let data2 = await res2.json()
            this.setState({ blogs: data, blogtags: data2 })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <section className="row justify-content-center">
                <DetailsCard blogs={this.state.blogs} key={this.state.blogs.id} blogtags={this.state.blogtags} />
            </section>
        )
    }

}

interface DetailsProps extends RouteComponentProps<{id: string}>{ }
interface DetailsState {
    blogs: IBlog
    blogtags: ITag[]
}

export default DetailsPage;