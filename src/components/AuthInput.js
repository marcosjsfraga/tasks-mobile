import React from "react";
import { View, TextInput, StyleSheet }  from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export default props => {
    return (
        <View style={[styles.container, props.styles]}>
            <Icon name={props.icon} size={20} style={styles.icon} />
            <TextInput {...props} style={styles.input} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        width: '100%',
        height: 40,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    icon: {
        color: '#666',
        marginLeft: 10,
    },
    input: {
        marginLeft: 10,
        width: '70%',
    }
});
