import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {TouchableOpacity} from 'react-native-gesture-handler'

interface Props {
  navigation: any
}

const Splash: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Text style={styles.title}> React Native Challenge </Text>
        <Text style={styles.title}> Axel León </Text>
      </View>
      <TouchableOpacity
        style={styles.go}
        onPress={() => navigation.navigate('Home')}>
        <Text style={{fontSize: 20, color: '#000', margin: 'auto'}}>
          {' '}
          Enter1
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 20,
    paddingVertical: 80,
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 30,
  },
  go: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 'auto',
  },
})
