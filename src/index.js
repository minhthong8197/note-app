import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
// import gql from 'graphql-tag'
// import { Query } from 'react-apollo'

const client = new ApolloClient({
    uri: 'http://localhost:3600/graphql'
})

// async function testQuery() {
//     const data = await client.query({
//         query: gql`
//             {
//                 notes {
//                     _id
//                     content
//                     isActive
//                 }
//             }
//         `
//     })
//     console.log(data)
// }
// testQuery();

// const TestQueryApp = () => (
//     <Query
//         query={gql`
//             {
//                 notes {
//                     _id
//                     content
//                     isActive
//                 }
//             }
//         `}
//     >
//         {({ loading, error, data }) => {
//             if (loading) return <p>Loading...</p>
//             if (error) return <p>Error</p>

//             return data.notes.map((note, i) => {
//                 if (note.isActive) {
//                     return (
//                         <div key={i}>
//                             <p>_id: {note._id}</p>
//                             <p>content: {note.content}</p>
//                             <hr></hr>
//                         </div>
//                     )
//                 }
//                 return <div key={i}></div>
//             })
//         }}
//     </Query>
// )

const ApolloApp = () => (
    <ApolloProvider client={client}>
        <App></App>
    </ApolloProvider>
)

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
