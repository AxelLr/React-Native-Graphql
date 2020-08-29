import {useEffect, useState} from 'react'
import {ISearch} from 'src/interfaces'

type variables = {
  page: number
  filter: any
}

const useSearch = (
  search: ISearch,
  setPage: (state: number) => void,
  fetchMore: any,
  variables: variables
) => {
  // HANDLE ERRORS USING USESTATE, USEQUERY ERROR DOESN'T HANDLE FETCHMORE ERRORS.
  const [error, setError] = useState<string | null>(null)

  const {typeSearch, nameSearch} = search

  // NAME SEARCH LENGTH
  const nameLength = nameSearch.trim().split('').length

  // TYPE SEARCH LENGTH
  const typeLength = typeSearch.trim().split('').length

  // DEBOUNCE
  const [typingTimeout, setTypingTimeOut] = useState<any>(0)

  const searchVariables = {...variables, page: 1}

  // APPLYING DEBUONCE TO SEARCH BY TEXT
  useEffect(() => {
    typingTimeout && clearTimeout(typingTimeout)

    setTypingTimeOut(
      setTimeout(async () => {
        // IF TEXT LENGTH > 3 REFECTH AND SET SEARCH RESULTS
        if ((nameLength || typeLength) >= 3) {
          try {
            await fetchMore({
              variables: searchVariables,
              updateQuery: (
                _: any,
                {fetchMoreResult}: {fetchMoreResult: any}
              ) => {
                return fetchMoreResult
              },
            })
            setError(null)
          } catch (error) {
            error.message === '404: Not Found' && setError('404: Not Found')
          }
        }
        // IF TEXT LENGTH === 0 REFETCH AND SET
        if (nameLength === 0 && typeLength === 0) {
          try {
            await fetchMore({
              searchVariables,
              updateQuery: (
                _: any,
                {fetchMoreResult}: {fetchMoreResult: any}
              ) => {
                return fetchMoreResult
              },
            })
            setError(null)
          } catch (error) {}
        }
      }, 800)
    )
  }, [search])

  return {
    error,
  }
}

export default useSearch
