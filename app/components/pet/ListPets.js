import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { size } from 'lodash';


const ListPets = (props) => {
    const { pets, handleLoadMore, loadingPet} = props;
    //const pets = []
	return (
		<View>
			{size(pets) > 0 ? (
                <FlatList data={pets}
                renderItem = { (pet) => <Pet pet={pet}/>}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                ListFooterComponent={<FooterList loadingPet={loadingPet}/>}/>
				
			) : (
				<View style={styles.loaderPet}>
					<ActivityIndicator size="large" />
					<Text>Cargando Mascotas</Text>
				</View>
			)}
		</View>
	);
};



function Pet(props){
    const { pet } =  props
    console.log('esta entrando esto')
    console.log(pet)
    const { image_id, name, type, raza, sex} = pet.item
    //const imagePet = image_id[0] ? image_id[0] : null
    const goPet = () => {
        console.log('ok')
    }
    return (
        <TouchableOpacity onPress={goPet}>
            <View style={styles.viewPet}>
                <View style={styles.viewPetImage}>
                    {/* <Image resizeMode='cover'
                    PlaceholderContent={<ActivityIndicator color='#FFF' />
                     }
                     source= {
                        imagePet 
                        ? {uri: imagePet}
                        : require('../../../assets/img/avatar_dog.png')
                     }
                     style={styles.imagePet}/> */}
                </View>
                <View>
                    <Text style={styles.namePet}>Nombre: {name}</Text>
                    <Text>Tipo: {type}</Text>
                    <Text>{sex}</Text>
                    <Text>Raza: {raza}</Text>
                    
                </View>
            </View>
        </TouchableOpacity>
    )
}


function FooterList(props){
    const { loadingPet } = props

    if (loadingPet){
        return (
            <View style={styles.loaderPet}> 
                <ActivityIndicator size='large'/>
            </View>
        )
    }else{
        return (
            <View style={styles.notFound}>
                <Text>No quedan mas mascotas por cargar</Text>
            </View>
        )
    }
}


export default ListPets;

const styles = StyleSheet.create({
    loaderPet:{
        marginTop:10,
        marginBottom:10,
        alignItems:'center'
    },
    viewPet:{
        flexDirection: 'row',
        margin:10
    },
    viewPetImage:{
        marginRight:15
    },
    imagePet:{
        width: 80,
        height:80
    },
    namePet:{
        fontWeight: 'bold'
    },
    notFound:{
        marginTop:10,
        marginBottom: 20,
        alignItems: 'center'
    }
});
