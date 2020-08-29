import React from 'react'
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native'
import {useQuery} from '@apollo/client'
import {GET_EPISODE} from '../../graphql/Queries'
import {IEpisode, ICharacter} from '../../interfaces'
import BodyText from '../../components/BodyText'
import {ScrollView} from 'react-native-gesture-handler'
import ModalWithLoader from '../../components/ModalWithLoader'

interface Props {
  modal: boolean
  setModal: (state: boolean) => void
  selectedEpisode: number | null
}

const SelectedEpisode: React.FC<Props> = ({
  modal,
  setModal,
  selectedEpisode,
}) => {
  const {data, loading} = useQuery(GET_EPISODE, {
    variables: {id: selectedEpisode},
  })

  const {name, episode, characters, air_date} =
    (data?.episode as IEpisode) || {}

  return (
    <ModalWithLoader modal={modal} setModal={setModal} loading={loading}>
      <Text style={styles.title}>{name}</Text>
      <BodyText>Episode: {episode}</BodyText>
      <BodyText>Release Date: {air_date} </BodyText>
      <BodyText>Characters:</BodyText>
      {characters?.slice(0, 5).map((character: ICharacter, index) => (
        <View style={styles.characterItem}>
          <Image
            style={styles.characterImage}
            source={{uri: character.image}}
            key={index}
          />
          <BodyText>{character.name}</BodyText>
        </View>
      ))}
    </ModalWithLoader>
  )
}

export default SelectedEpisode

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    color: '#e5e5e5',
    fontSize: 34,
    paddingTop: 15,
  },
  characterImage: {
    marginTop: 15,
    marginRight: 10,
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  characterItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
