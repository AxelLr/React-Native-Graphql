import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ICharacter} from '../../interfaces/index'

interface Props {
  character: ICharacter
  setSelectedCharacter: (state: number) => void
  setModal: (state: boolean) => void
}

const CharacterListItem: React.FC<Props> = ({
  character,
  setSelectedCharacter,
  setModal,
}) => {
  const navigation = useNavigation()

  const {id, image, name} = character

  const openModal = () => {
    setSelectedCharacter(id)
    setModal(true)
  }

  return (
    <TouchableOpacity onPress={() => openModal()} style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(CharacterListItem)

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 250,
    marginTop: 10,
    backgroundColor: '#e5e5e5',
    elevation: 10,
  },
  infoContainer: {
    padding: 5,
  },
  title: {
    width: '100%',
    fontSize: 14,
    color: '#121212',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
})
