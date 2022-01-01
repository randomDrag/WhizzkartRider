import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


import { Provider } from "react-redux"
import IntermediateApp from './IntermediateApp';
import store from './src/Redux/store';


const App = () => {

  return (
    <Provider store={store}>
      <IntermediateApp />
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({})
