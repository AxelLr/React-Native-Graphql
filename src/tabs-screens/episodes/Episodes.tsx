import React, {useState} from 'react'
import {View, ActivityIndicator, FlatList, StyleSheet} from 'react-native'
import {ISearch} from 'src/interfaces'
import usePagination from '../../customHooks/usePagination'
import {GET_EPISODES} from '../../graphql/Queries'
import {IEpisode} from '../../interfaces/index'
import SelectedEpisode from './SelectedEpisode'
import EpisodeListItem from './EpisodeListItem'
import ErrorText from '../../components/ErrorText'

interface Props {
  search: ISearch
  setSearch: (state: ISearch | ((prevState: ISearch) => ISearch)) => void
}

const Characters: React.FC<Props> = ({search, setSearch}) => {
  const {data, changeCurrentPage, loading, error} = usePagination(
    GET_EPISODES,
    search,
    true,
    'episodes'
  )

  const {results} = data?.episodes || {}

  const [modal, setModal] = useState(false)

  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null)

  if (error) return <ErrorText />

  return (
    <View style={{height: '100%'}}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item: IEpisode, index) => String(index)}
        data={results}
        onEndReached={() => changeCurrentPage((page) => page + 1)}
        onEndReachedThreshold={0.5}
        renderItem={({item}: {item: IEpisode}) => (
          <EpisodeListItem
            episode={item}
            setModal={setModal}
            setSelectedEpisode={setSelectedEpisode}
          />
        )}
      />
      {loading && (
        <ActivityIndicator style={{padding: 10}} size="large" color="#fff" />
      )}
      {modal && (
        <SelectedEpisode
          modal={modal}
          setModal={setModal}
          selectedEpisode={selectedEpisode}
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
