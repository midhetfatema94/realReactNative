//Step 1: Import libraries
import React from 'react';
import { Text, AppRegistry, View } from 'react-native';

//Step 2: Make component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 60,
        paddingBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
}
//Step 3: Make components available for the other parts of the app
export { Header };