import React from 'react'
import {Text, StyleSheet} from 'react-native'

export default function BodyText() {
  return <Text style={styles.bodyText}> No Results, try again. </Text>
}

const styles = StyleSheet.create({
  bodyText: {
    alignSelf: 'center',
    color: '#e5e5e5',
    fontSize: 30,
    marginTop: 10,
  },
})
