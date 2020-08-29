import React from 'react'
import {View, Modal, StyleSheet, Text, Image} from 'react-native'
import {useQuery} from '@apollo/client'
import {GET_LOCATION} from '../../graphql/Queries'
import {ICharacter, ILocation} from '../../interfaces'
import BodyText from '../../components/BodyText'
import {ScrollView} from 'react-native-gesture-handler'
import ModalWithLoader from '../../components/ModalWithLoader'

interface Props {
  modal: boolean
  setModal: (state: boolean) => void
  selectedLocation: number | null
}

const SelectedLocation: React.FC<Props> = ({
  modal,
  setModal,
  selectedLocation,
}) => {
  const {data, loading} = useQuery(GET_LOCATION, {
    variables: {id: selectedLocation},
  })

  const {name, type, dimension, residents} = (data?.location as ILocation) || {}

  return (
    <ModalWithLoader modal={modal} setModal={setModal} loading={loading}>
      <Text style={styles.title}>{name}</Text>
      <BodyText>Type: {type} </BodyText>
      <BodyText>Dimension: {dimension}</BodyText>
      <BodyText>Characters:</BodyText>
      {residents?.slice(0, 5).map((character: ICharacter, index) => (
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

export default SelectedLocation

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
