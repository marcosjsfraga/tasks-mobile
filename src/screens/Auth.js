import React, { Component } from "react";
import { 
    ImageBackground, 
    Text, 
    StyleSheet,
    View, 
    TextInput, 
    TouchableOpacity, 
    Platform,
    Alert 
} from 'react-native';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from "../commonStyles";

import AuthInput from '../components/AuthInput';

export default class Auth extends Component {

    state = {
        name: '',
        email: '', 
        password: '',
        confirmPassword: '',
        stageNew: false
    }

    siginOrSigup = () => {
        if (this.state.stageNew ) {
            Alert.alert('Sucesso!', 'Criar conta.');
        } else {
            Alert.alert('Sucesso!', 'Logar.');
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    {/* Subtitle */}
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta': 'Informe seus dados'}
                    </Text>
                    
                    {/* Name */}
                    {this.state.stageNew &&
                        <TextInput 
                            placeholder='Nome' 
                            value={this.state.name} 
                            onChangeText={name => this.setState({ name })}
                            style={styles.input} />
                    }
                    <TextInput 
                        placeholder='E-mail' 
                        value={this.state.email} 
                        onChangeText={email => this.setState({ email })}
                        style={styles.input} />
                    <TextInput 
                        placeholder='Senha' 
                        secureTextEntry={true}
                        value={this.state.password} 
                        onChangeText={password => this.setState({ password })}
                        style={styles.input} />
                    {/* Confirm Password */}
                    {this.state.stageNew &&
                        <TextInput 
                            placeholder='Confirmar Senha' 
                            secureTextEntry={true}
                            value={this.state.confirmPassword} 
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            style={styles.input} />
                    }

                    <TouchableOpacity onPress={this.siginOrSigup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew 
                                    ? 'Registrar' 
                                    : 'Entrar' 
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui uma conta?': 'Ainda não possui uma conta?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
        
	},
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#fff',
        padding: Platform.OS == 'ios' ? 15 : 10,
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 15,
        fontWeight: 'bold'
    }
});
