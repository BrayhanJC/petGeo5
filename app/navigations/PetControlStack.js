import { createStackNavigator } from 'react-navigation-stack'
import PetControlScreens from '../screens/PetControls'

/***
 * Create stack nav pets controls
 * show all pets controls register by user
 */

 const PetControlScreenStack = createStackNavigator({
     PetsControls : {
         screen: PetControlScreens,
         navigationOptions: () => ({
             title: 'Controles'
         })
     }
 })

export default PetControlScreenStack