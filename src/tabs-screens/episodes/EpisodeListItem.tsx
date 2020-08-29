import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {IEpisode} from '../../interfaces/index'

interface Props {
  episode: IEpisode
  setSelectedEpisode: (state: number) => void
  setModal: (state: boolean) => void
}

const CharacterListItem: React.FC<Props> = ({
  episode,
  setSelectedEpisode,
  setModal,
}) => {
  const navigation = useNavigation()

  const {name, episode: ep, id} = episode

  const openModal = () => {
    setSelectedEpisode(id)
    setModal(true)
  }

  return (
    <TouchableHighlight onPress={() => openModal()} style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.ep}>{ep}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default React.memo(CharacterListItem)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 300,
    height: 100,
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
