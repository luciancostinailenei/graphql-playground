const {
    Environment,
    Network,
    RecordSource,
    Store
} = require('relay-runtime') 

const store = new Store(new RecordSource()) // for cached queries

// for querying the server - instantiated with a function that returns a promise
const network = Network.create((operation, variables) => {
    return fetch(' https://api.graph.cool/relay/v1/cj8br66e107j10144q85i39lx', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: operation.text,
            variables
        }),
    }).then(response => {
        return response.json()
    })
})

// instantiating the Relay environment
const environment = new Environment({
    network,
    store
})

export default environment 