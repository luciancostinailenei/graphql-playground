import React, { Component } from 'react'
import {
    createFragmentContainer,
    graphql
}                           from 'react-relay'

import Link                 from '../Link/Link'

import NewVoteSubscription from '../../subscriptions/NewVoteSubscription'

class LinkList extends Component {

    componentDidMount() {
        NewVoteSubscription()
    }

    render() {
        return (
            <div>
                <div>
                { 
                    this.props.viewer.allLinks.edges.map(({ node }, index) => (
                        <Link 
                            key={ node.__id } 
                            index={ index } 
                            link={ node }
                        />
                    )) 
                }
                </div>
                {/* <div className='flex ml4 mv3 gray'>
                    <div className='pointer' onClick={() => this._loadMore()}>More</div>
                </div> */}
            </div>
        )
    }

}

export default createFragmentContainer(LinkList, graphql`
    fragment LinkList_viewer on Viewer {
        allLinks(last: 100, orderBy: createdAt_DESC) @connection(key: "LinkList_allLinks", filters: []) {
            edges {
                node {
                    ...Link_link
                }
            }
        }
    }
`)

/*
@connection directive - used for caching
*/