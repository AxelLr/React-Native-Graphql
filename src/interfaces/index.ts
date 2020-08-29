export interface ICharacter {
    id: number
    image: string
    name: string
    type: string
    gender: string
    species: string
  }
  
  export interface IEpisode {
    id: number
    name: string
    air_date: string
    episode: string
    characters: ICharacter[]
    created: string
  }
  
  export interface ILocation {
    id: number
    name: string
    type: string
    dimension: string
    residents: ICharacter[]
    created: string
  }
  
  export interface ISearch {
    nameSearch: string
    typeSearch: string
  }
  
  export interface ICategories {
    characters: React.ReactNode
    locations: React.ReactNode
    episodes: React.ReactNode
  }
  