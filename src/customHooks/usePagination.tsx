import {useState, useEffect} from 'react'
import {useQuery, DocumentNode} from '@apollo/client'
import {ISearch} from 'src/interfaces'
import useSearch from './useSearch'

export default function usePagination(
  query: DocumentNode,
  search: ISearch,
  searchOnlyByName?: boolean,
  queryName: string
) {
  // PAGINATION HANDLER
  const [page, setPage] = useState<number>(1)
  // QUERY HANDLER
  const {data, loading, networkStatus, fetchMore} = useQuery(query, {
    notifyOnNetworkStatusChange: true,
  })

  const {typeSearch, nameSearch} = search

  const filters = searchOnlyByName
    ? {name: nameSearch}
    : {name: nameSearch, type: typeSearch}

  const variables = {page, filter: filters}

  // FETCH NEW PAGE WHENEVER PAGE STATE CHANGES
  useEffect(() => {
    fetchMore({
      variables,
      updateQuery: (prevResults, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prevResults
        return {
          [queryName]: {
            ...fetchMoreResult[queryName],
            results: [
              ...prevResults[queryName].results,
              ...fetchMoreResult[queryName].results,
            ],
          },
        }
      },
    }).catch((err) => console.log(err))
  }, [page])

  const getMore = () => setPage(page + 1)

  const {error} = useSearch(search, setPage, fetchMore, variables)

  // const loading = loadingQuery || networkStatus === 3 || networkStatus === 1
  return {
    data: data,
    currentPage: page,
    changeCurrentPage: setPage,
    loading,
    error,
    getMore,
  }
}
