import React from 'react'
// APOLLO CLIENT
import {ApolloClient, InMemoryCache} from '@apollo/client'
// APOLLO PROVIDER
import {ApolloProvider} from '@apollo/client'
// LAYOUT
import Layout from './src/layout/layout'
import {SafeAreaView} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import Theme from './src/Theme'

const API_URL = 'https://rickandmortyapi.com/graphql'

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  //  {
  //   typePolicies: {
  //     Query: {
  //       fields: {
  //         characters: {
  //           merge(existing, data: any) {
  //             console.log(data)
  //             return {
  //               ...data,
  //               results: [...(existing?.results || []), ...data?.results],
  //             }
  //           },
  //         },
  //       },
  //     },
  //   },
  // }
})

declare const global: {HermesInternal: null | {}}

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ApolloProvider client={client}>
        <NavigationContainer theme={Theme}>
          <Layout />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaView>
  )
}

export default App
