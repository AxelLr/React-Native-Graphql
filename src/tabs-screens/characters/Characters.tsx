import React, {useState} from 'react'
import {View, FlatList, StyleSheet, ActivityIndicator, Text} from 'react-native'

import usePagination from '../../customHooks/usePagination'
// GQL
import {GET_CHARACTERS} from '../../graphql/Queries'
// INTERFACES
import {ICharacter, ISearch} from '../../interfaces/index'
// COMPONENTS
import CharacterListItem from './CharacterListItem'
import SelectedCharacter from './SelectedCharacter'
import ErrorText from '../../components/ErrorText'

interface Props {
  search: ISearch
  setSearch: (state: ISearch | ((prevState: ISearch) => ISearch)) => void
}

const Characters: React.FC<Props> = ({search, setSearch}) => {
  const {data, changeCurrentPage, loading, getMore, error} = usePagination(
    GET_CHARACTERS,
    search,
    false,
    'characters'
  )

  const {results} = data?.characters || {}

  const [modal, setModal] = useState(false)

  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(
    null
  )

  if (error) return <ErrorText />

  return (
    <View style={{height: '100%'}}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item: ICharacter, index) => String(index)}
        data={results}
        onEndReached={() => getMore()}
        onEndReachedThreshold={0.5}
        renderItem={({item}: {item: ICharacter}) => (
          <CharacterListItem
            setModal={setModal}
            setSelectedCharacter={setSelectedCharacter}
            character={item}
          />
        )}
      />
      {loading && (
        <ActivityIndicator style={{padding: 10}} size="large" color="#fff" />
      )}
      {modal && (
        <SelectedCharacter
          modal={modal}
          setModal={setModal}
          selectedCharacter={selectedCharacter}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 30,
  },
})

export default Characters
