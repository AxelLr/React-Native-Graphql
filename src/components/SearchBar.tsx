import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchInput from './SearchInput'
import {ISearch} from '../interfaces/index'
import {useRoute} from '@react-navigation/native'

interface Props {
  handleSearch: (name: string, text: string) => void
  search: ISearch
}

const SearchBar: React.FC<Props> = ({handleSearch, search}) => {
  const [inputName, setinputName] = useState<string>('nameSearch')

  const route = useRoute()

  useEffect(() => {
    route?.state?.index === 2 && setinputName('nameSearch')
  }, [route])

  const inputNameChange =
    inputName === 'nameSearch' ? 'typeSearch' : 'nameSearch'

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 16,
      }}>
      {route?.state?.index !== 2 && (
        <Icon
          name="exchange"
          color="#fff"
          size={30}
          onPress={() => setinputName(inputNameChange)}
        />
      )}
      <SearchInput
        handleSearch={handleSearch}
        search={search}
        inputName={inputName}
      />
    </View>
  )
}

export default SearchBar
