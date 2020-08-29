import {gql} from '@apollo/client'

export const GET_CHARACTERS = gql`
  query($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`
export const GET_LOCATIONS = gql`
  query($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        pages
      }
      results {
        id
        name
        dimension
      }
    }
  }
`
export const GET_EPISODES = gql`
  query($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        pages
      }
      results {
        id
        episode
        name
      }
    }
  }
`

export const GET_LOCATION = gql`
  query($id: ID!) {
    location(id: $id) {
      name
      type
      dimension
      residents {
        id
        name
        image
      }
    }
  }
`

export const GET_CHARACTER = gql`
  query($id: ID!) {
    character(id: $id) {
      id
      name
      type
      gender
      species
      image
    }
  }
`

export const GET_EPISODE = gql`
  query($id: ID!) {
    episode(id: $id) {
      id
      episode
      name
      air_date
      characters {
        id
        name
        image
      }
    }
  }
`
