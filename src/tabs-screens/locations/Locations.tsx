import React, {useState} from 'react'
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native'
import {ISearch, ILocation} from 'src/interfaces/index'
import usePagination from '../../customHooks/usePagination'
import {GET_LOCATIONS} from '../../graphql/Queries'
// COMPONENTS
import SelectedLocation from './SelectedLocation'
import LocationListItem from './LocationListItem'
import ErrorText from '../../components/ErrorText'

interface Props {
  search: ISearch
  setSearch: (state: ISearch | ((prevState: ISearch) => ISearch)) => void
}

const Locations: React.FC<Props> = ({search, setSearch}) => {
  const {data, changeCurrentPage, loading, error} = usePagination(
    GET_LOCATIONS,
    search,
    false,
    'locations'
  )

  const {results} = data?.locations || {}
  const [modal, setModal] = useState(false)

  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  if (error) return <ErrorText />

  return (
    <View style={{height: '100%'}}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item: ILocation, index) => String(index)}
        data={results}
        onEndReached={() => changeCurrentPage((page) => page + 1)}
        onEndReachedThreshold={0.5}
        renderItem={({item}: {item: ILocation}) => (
          <LocationListItem
            location={item}
            setModal={setModal}
            setSelectedLocation={setSelectedLocation}
          />
        )}
      />
      {loading && (
        <ActivityIndicator style={{padding: 10}} size="large" color="#fff" />
      )}
      {modal && (
        <SelectedLocation
          modal={modal}
          setModal={setModal}
          selectedLocation={selectedLocation}
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

export default Locations
