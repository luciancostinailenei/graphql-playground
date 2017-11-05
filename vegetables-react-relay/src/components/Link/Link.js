import React, { Component }      from 'react'
     
import {     
    createFragmentContainer,     
    graphql     
}                                from 'react-relay'
     
import { GC_USER_ID }            from '../../constants'

import { timeDifferenceForDate } from '../../utils'

import CreateVoteMutation        from '../../mutations/CreateVoteMutation'

class Link extends Component {
    render() {
        const userId = localStorage.getItem(GC_USER_ID)

        return (
            <div className='flex mt2 items-start'>
                <div className='flex items-center'>
                    <span className='gray'>{ this.props.index + 1 }.</span>
                    { 
                        userId && 
                            <div 
                                className='ml1 gray fl1'
                                onClick={ () => this._voteForLink() } 
                            >
                                ▲
                            </div> 
                    }
                </div>

                <div className='ml1'>
                    <div>{ this.props.link.description } ({ this.props.link.url })</div>
                    <div className='f6 lh-copy gray'> 
                        { this.props.link.votes.count } votes | by <b>{ this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown' }</b> { timeDifferenceForDate(this.props.link.createdAt) } 
                    </div>        
                </div>
            </div>
        )
    }

    _voteForLink = () => {
        const userId = localStorage.getItem(GC_USER_ID)
        if (!userId) {
            console.log(`Can't vote without user ID`)
            return
        }

        if (!this._userCanVoteForLink(userId)) {
            alert('You have already voted for this link !')
            return
        }

        const linkId = this.props.link.id

        CreateVoteMutation(userId, linkId) 
    }

    _userCanVoteForLink(userId) {
        const usersIdsWhichVotedForLink = this.props.link.votes.edges.map((edge) => {
            return edge.node.user.id
        })

        const userHasVotedForLink = usersIdsWhichVotedForLink.find((id) => {
            return userId === id
        })

        return !userHasVotedForLink
    }
}

// declaring component's data dependencies in the form of a graphql fragment
export default createFragmentContainer(Link, graphql`
    fragment Link_link on Link {
        id
        description
        url
        createdAt
        postedBy {
            id 
            name
        }
        votes {
            count
            edges {
                node {
                    user {
                        id
                    }
                }
            }
        }
    }
`)

/* 
Naming convention: Each fragment should be named
according to the file and the prop that will
get injected into the component: <FileName>_<propName>
*/