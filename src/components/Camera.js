import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
const Camera = ({ ImagePick, image }) => {

    return (
        <TouchableOpacity onPress={() => ImagePick()}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={image === '../../assets/user.png' ?
                    require('../../assets/user.png') :
                    { uri: image }} style={{ width: 150, height: 150, borderRadius: 75 }} />
            </View>
        </TouchableOpacity>
    );
}
export default Camera;