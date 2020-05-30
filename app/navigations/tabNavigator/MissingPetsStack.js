import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MissingPetsScreen from "../../screens/missingPets/MissingPets";
import AddMissingPet from "../../screens/missingPets/AddMessingPet";
import AvatarIcon from "../../components/AvatarIcon";
import MissingPetView from '../../screens/missingPets/MissingPetView'
const Stack = createStackNavigator();

/***
 * Create stack nav missing pets
 * Show all the missing pets registers
 */
function MissingPetsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="missing-pets"
        component={MissingPetsScreen}
        options={{
          title: "Mascotas extraviadas",
          headerLeft: () => <AvatarIcon />,
        }}
      />
      <Stack.Screen
        name="add-missing-pet"
        component={AddMissingPet}
        options={{
          title: "Agregar Reporte",
          headerLeft: () => <AvatarIcon />,
        }}
      />
      <Stack.Screen name="ViewMissingPet" component={MissingPetView} />
    </Stack.Navigator>
  );
}

export default MissingPetsStack;
