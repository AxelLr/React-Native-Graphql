import React, {useState} from 'react'
import {View, TextInput} from 'react-native'
import {ISearch} from '../interfaces/index'

interface Props {
  search: ISearch
  handleSearch: (name: string, text: string) => void
  inputName: string
}

const SearchInput: React.FC<Props> = ({search, handleSearch, inputName}) => {
  const placeholder = inputName === 'nameSearch' ? 'Name' : 'Type'

  return (
    <TextInput
      clearButtonMode="always"
      placeholder={`Search by ${placeholder}`}
      style={{
        marginLeft: 20,
        width: '90%',
        height: 40,
        borderColor: '#121212',
        borderWidth: 1,
        backgroundColor: '#fff',
        color: '#000',
      }}
      onChangeText={(text) => handleSearch(inputName, text)}
      value={inputName === 'nameSearch' ? search.nameSearch : search.typeSearch}
    />
  )
}

export default SearchInput
