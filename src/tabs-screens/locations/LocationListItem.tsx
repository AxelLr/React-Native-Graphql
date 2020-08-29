import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ILocation} from '../../interfaces/index'

interface Props {
  location: ILocation
  setSelectedLocation: (state: number) => void
  setModal: (state: boolean) => void
}

const LocationListItem: React.FC<Props> = ({
  location,
  setSelectedLocation,
  setModal,
}) => {
  const navigation = useNavigation()

  const {name, dimension, id} = location

  const openModal = () => {
    setSelectedLocation(id)
    setModal(true)
  }

  return (
    <TouchableHighlight onPress={() => openModal()} style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.ep}>Dimension: {dimension}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default React.memo(LocationListItem)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: 300,
    height: 120,
    marginTop: 10,
    backgroundColor: '#212121',
    elevation: 10,
    padding: 5,
  },
  infoContainer: {
    padding: 5,
  },
  name: {
    width: '100%',
    fontSize: 24,
    color: '#e5e5e5',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  ep: {
    color: '#e5e5e5',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
})
