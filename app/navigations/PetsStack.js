import { createStackNavigator } from 'react-navigation-stack'
import PetsScreens from '../screens/Pets'

/***
 * Create stack nav pets
 * show all pets register by user
 */
const PetsScreenStacks = createStackNavigator({

    Pets : {
        screen : PetsScreens,
        navigationOptions: () => ({
            title: 'Mis Mascotas'
        })
    }
})

export default PetsScreenStacks