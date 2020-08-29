import React from 'react'
import {View, Text} from 'react-native'
// // NAVIGATION
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// TABSCREENS
import Characters from '../tabs-screens/characters/Characters'
import Locations from '../tabs-screens/locations/Locations'
import Episodes from '../tabs-screens/episodes/Episodes'
// ICONS
import Icon from 'react-native-vector-icons/MaterialIcons'
import {ISearch} from '../interfaces/index'
import {useRoute} from '@react-navigation/native'

const Tab = createBottomTabNavigator()

interface Props {
  search: ISearch
  setSearch: (state: ISearch | ((prevState: ISearch) => ISearch)) => void
}

const INPUTS_STATE: ISearch = {
  nameSearch: '',
  typeSearch: '',
}

const Home: React.FC<Props> = ({search, setSearch}) => {
  const route = useRoute()
  return (
    <View style={{height: '100%'}}>
      <Tab.Navigator tabBarOptions={{keyboardHidesTabBar: true}}>
        <Tab.Screen
          listeners={({navigation, route: currentRoute}) => ({
            tabPress: (e) =>
              route.name !== currentRoute.name && setSearch(INPUTS_STATE),
          })}
          name="Characters"
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="ac-unit" color={focused ? '#fff' : '#a9a9a9'} />
            ),
          }}>
          {(props) => (
            <Characters search={search} setSearch={setSearch} {...props} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Locations"
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="shopping-cart" color={focused ? '#fff' : '#a9a9a9'} />
            ),
          }}>
          {(props) => (
            <Locations search={search} setSearch={setSearch} {...props} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Episodes"
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="shopping-cart" color={focused ? '#fff' : '#a9a9a9'} />
            ),
          }}>
          {(props) => (
            <Episodes search={search} setSearch={setSearch} {...props} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  )
}

export default Home
