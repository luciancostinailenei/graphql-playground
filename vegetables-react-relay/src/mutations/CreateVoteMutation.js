import {
    commitMutation,
    graphql
}                            from 'react-relay'

import  environment          from '../Environment'

const mutation = graphql`
    mutation CreateVoteMutation($input: CreateVoteInput!) {
        createVote(input: $input) {
            vote {
                id
                link {
                    id
                    votes {
                        count
                    }
                }
                user {
                    id
                }
            }
        }
    }
`

export default (userId, linkId) => {
    const variables = {
        input: {
            userId,
            linkId,
            clientMutationId: ""
        }
    }
    
    commitMutation(
        environment,
        {
            mutation,
            variables,
            // optimisticUpdater is triggered right after the mutation is sent (before the server response comes back)
            // it allows you to implement the success scenario of the mutation so that the user sees the effect of the 
            // mutation right away without having to wait for the server response
            optimisticUpdater: proxyStore => { // proxyStore allows you to manipulate the cache
                const link = proxyStore.get(linkId)
                let currentVoteCount = link.getLinkedRecord('votes').getValue('count')
                const newVoteCount = currentVoteCount++

                link.getLinkedRecord('votes').setValue(newVoteCount, 'count')
            },
            // updater is triggered right after the server response comes back
            // any changes done in optimisticUpdater are rolled back before updater is executed
            updater: proxyStore => {
                const createVoteField = proxyStore.getRootField('createVote')
                const newVote = createVoteField.getLinkedRecord('vote')
                const updatedLink = newVote.getLinkedRecord('link')
                const newVotes = updatedLink.getLinkedRecord('votes')
                const newVoteCount = newVotes.getValue('count')

                const link = proxyStore.get(linkId)
                link.getLinkedRecord('votes').setValue(newVoteCount, 'count')
            },
            onError: err => console.error(err)
        }
    )
}
