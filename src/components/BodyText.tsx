import React from 'react'
import {Text, StyleSheet} from 'react-native'

export default function BodyText({children}: {children: React.ReactNode}) {
  return <Text style={styles.bodyText}>{children}</Text>
}

const styles = StyleSheet.create({
  bodyText: {
    color: '#e5e5e5',
    fontSize: 20,
    marginTop: 10,
  },
})
