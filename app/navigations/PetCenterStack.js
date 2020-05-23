import {createStackNavigator} from 'react-navigation-stack'
import PetCenterScreens from '../screens/PetCenters'

/***
 * Create stack nav pets center
 * show all pets controls register by user
 */
const PetCenterScreenStack = createStackNavigator({
    PetCenter: {
        screen: PetCenterScreens,
        navigationOptions:() => ({
            title: 'Centros'
        })
    }
})

export default PetCenterScreenStack

