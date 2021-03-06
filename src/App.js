import React, { Component } from 'react'
import { Root } from 'native-base'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import { Navigator as CoreNavigator, Utils, Navigation } from './'
import { Navigator as UserNavigator } from 'user-module'

const AppNavigator = createStackNavigator(
  {
    CoreModule: CoreNavigator,
    UserModule: UserNavigator,
  },
  {
    initialRouteName: 'CoreModule',
    headerMode: 'none',
  }
)

Navigation.supportNestedRouter(AppNavigator)

const AppContainer = createAppContainer(AppNavigator)

class App extends Component {

  onNavigationStateChange(prevState, currentState) {
    const currentScreen = Navigation.getActiveRouteName(currentState)
    const prevScreen = Navigation.getActiveRouteName(prevState)
    if (prevScreen !== currentScreen) {
      //Screen tracking (Analytics tracker)
    }
  }

  render() {
    return (
      <Root>
        <AppContainer
          uriPrefix={Utils.getDeepLink()}
          onNavigationStateChange={(prev, current) => this.onNavigationStateChange(prev, current)}
          ref={navigatorRef => { Navigation.setTopLevelNavigator(navigatorRef) }}
        />
      </Root>
    )
  }
}

export default App