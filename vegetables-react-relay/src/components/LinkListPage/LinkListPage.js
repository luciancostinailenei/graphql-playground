/*
 * QueryRenderer - higher-order component that takes care of composing the actual query, 
   fetching the data and calling the render callback with the data
 * QueryRenderer is the root of the Relay tree
 */

import React, { Component } from 'react'

import {
    QueryRenderer,
    graphql
}                           from 'react-relay'

import environment          from '../../Environment'

import LinkList             from '../LinkList/LinkList'

const LinkListPageQuery = graphql`
    query LinkListPageQuery {
        viewer {
            ...LinkList_viewer
        }
    }
` // to notice how the LinkList_viewer fragment from the LinkList component is reused

class LinkListPage extends Component {

    render() {
        return (
            <QueryRenderer
                environment={ environment }
                query={ LinkListPageQuery }
                render={ 
                    ({ error, props }) => {
                        if (error) {
                            return <div>{ error.message }</div>
                        } else if (props) {
                            return <LinkList viewer={ props.viewer } />
                        }

                        return <div>Loading</div>
                    } 
                }
            />
        )
    }

}

export default LinkListPage