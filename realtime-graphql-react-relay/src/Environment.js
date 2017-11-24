import { GC_AUTH_TOKEN }      from './constants'

import { SubscriptionClient } from 'subscriptions-transport-ws'

const {
    Environment,
    Network,
    RecordSource,
    Store
} = require('relay-runtime') 

const store = new Store(new RecordSource()) // for cached queries

const fetchQuery = (operation, variables) => {
    return fetch(' https://api.graph.cool/relay/v1/cj8br66e107j10144q85i39lx', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
        },
        body: JSON.stringify({
            query: operation.text,
            variables
        }),
    }).then(response => {
        return response.json()
    })
}

const setupSubscription = (config, variables, cacheConfig, observer) => {
    const query = config.text
    
    const subscriptionClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj8br66e107j10144q85i39lx', {reconnect: true})
    subscriptionClient.subscribe({query, variables}, (error, result) => {
        observer.onNext({data: result})
    })
}

// for querying the server - instantiated with a function that returns a promise
const network = Network.create(fetchQuery, setupSubscription)

// instantiating the Relay environment
const environment = new Environment({
    network,
    store
})

export default environment 