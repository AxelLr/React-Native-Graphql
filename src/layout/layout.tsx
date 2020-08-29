import React, {useState} from 'react'
// // NAVIGATION
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
// SCREENS
import Splash from '../screens/Splash'
import Home from '../screens/Home'
import {ISearch} from '../interfaces/index'
// COMPONENTS
import SearchBar from '../components/SearchBar'

const Stack = createStackNavigator()

const INPUTS_STATE: ISearch = {
  nameSearch: '',
  typeSearch: '',
}

const Layout = () => {
  const [search, setSearch] = useState<ISearch>(INPUTS_STATE)

  const handleSearch = (name: string, text: string) => {
    setSearch((prev) => {
      return {...prev, [name]: text}
    })
  }

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="splash"
        component={Splash}
      />
      <Stack.Screen
        options={{
          headerLeft: null,
          headerTitle: (props) => (
            <SearchBar {...props} handleSearch={handleSearch} search={search} />
          ),
        }}
        name="Home">
        {(props) => <Home search={search} setSearch={setSearch} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default Layout
