import React from 'react'
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native'
import {useQuery} from '@apollo/client'
import {GET_CHARACTER} from '../../graphql/Queries'
import {ICharacter} from '../../interfaces'
import BodyText from '../../components/BodyText'
import ModalWithLoader from '../../components/ModalWithLoader'

interface Props {
  modal: boolean
  setModal: (state: boolean) => void
  selectedCharacter: number | null
}

const SelectedCharacter: React.FC<Props> = ({
  modal,
  setModal,
  selectedCharacter,
}) => {
  const {data, loading} = useQuery(GET_CHARACTER, {
    variables: {id: selectedCharacter},
  })

  const {name, species, type, gender, image} =
    (data?.character as ICharacter) || {}

  return (
    <ModalWithLoader modal={modal} setModal={setModal} loading={loading}>
      <Image style={styles.characterImage} source={{uri: image}} />
      <BodyText>Name: {name}</BodyText>
      <BodyText>Species: {species}</BodyText>
      <BodyText>Gender: {gender} </BodyText>
      <BodyText>Type: {type || 'none'} </BodyText>
    </ModalWithLoader>
  )
}

export default SelectedCharacter

const styles = StyleSheet.create({
  characterImage: {
    alignSelf: 'center',
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  title: {
    width: '100%',
    fontSize: 14,
    color: '#121212',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  image: {
    resizeMode: 'cover',
  },
})
