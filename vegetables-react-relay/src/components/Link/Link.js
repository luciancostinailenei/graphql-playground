import React, { Component } from 'react'

import {
    createFragmentContainer,
    graphql
}                           from 'react-relay'

class Link extends Component {
    render() {
        return (
            <div>
                { this.props.link.description } ({ this.props.link.url })
            </div>
        )
    }

    _voteForLink = async () => {
        // to be implemented
    }
}

// declaring component's data dependencies in the form of a graphql fragment
export default createFragmentContainer(Link, graphql`
    fragment Link_link on Link {
        id
        description
        url
    }
`)

/* 
Naming convention: Each fragment should be named
according to the file and the prop that will
get injected into the component: <FileName>_<propName>
*/