import {
    graphql,
    requestSubscription
}                        from 'react-relay'

import environment       from '../Environment'

const newVoteSubscription = graphql`
    subscription NewVoteSubscription {
        Vote {
            node {
                id
                user {
                    id
                }    
                link {
                    id
                    _votesMeta {
                        count
                    }
                }    
            }
        }
    }
`

export default () => { 
    const subscriptionConfig = {
        subscription: newVoteSubscription,
        variables: {},
        updater: proxyStore => {
            const createVoteField = proxyStore.getRootField('Vote')
            const newVote = createVoteField.getLinkedRecord('node')
            const updatedLink = newVote.getLinkedRecord('link')
            const linkId = updatedLink.getValue('id')
            const newVotes = updatedLink.getLinkedRecord('_votesMeta')
            const newVotesCount = newVotes.getLinkedRecord('count')

            const link = proxyStore.get(linkId)
            link.getLinkedRecord('votes').setValue(newVotesCount, 'count')

        },
        onError: error => console.log(`An error occured:`, error)
    }

    requestSubscription(
        environment,
        subscriptionConfig
    )
}