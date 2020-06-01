import React, { Component } from "react";
import { 
    ImageBackground, 
    Text, 
    StyleSheet,
    View, 
    TouchableOpacity, 
    Alert 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from "../commonStyles";
import AuthInput from '../components/AuthInput';
import { server, showError, showSuccess } from '../common';

const initialState = { 
    name: '',
    email: 'marcosjsfraga@gmail.com', 
    password: '123',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    siginOrSigup = async () => {
        if (this.state.stageNew ) {
            this.signup();
        } else {
            this.signin();
        }
    }

    signup = () => {
        try {
            axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email, 
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            });
            
            showSuccess('Usuário cadastrado.');
            this.setState({ ...initialState });
        } catch (error) {
            showError(error);
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email, 
                password: this.state.password,
            });

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`;
            this.props.navigation.navigate('Home', res.data);
        } catch (error) {
            showError(error);
        }
    }

    render() {

        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'));
        validations.push(this.state.password && this.state.password >= 3);

        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name >= 3);
            validations.push(this.state.password === this.state.confirmPassword);
        }

        // O formulário será válido se todas validações forem verdadeiras
        const validaForm = validations.reduce((t, a) => t && a);

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
                        <AuthInput 
                            icon='user'
                            placeholder='Nome' 
                            value={this.state.name} 
                            onChangeText={name => this.setState({ name })}
                            style={styles.input} />
                    }
                    <AuthInput 
                        icon='at'
                        placeholder='E-mail' 
                        value={this.state.email} 
                        onChangeText={email => this.setState({ email })}
                        style={styles.input} />
                    <AuthInput 
                        icon='lock'
                        placeholder='Senha' 
                        secureTextEntry={true}
                        value={this.state.password} 
                        onChangeText={password => this.setState({ password })}
                        style={styles.input} />
                    {/* Confirm Password */}
                    {this.state.stageNew &&
                        <AuthInput 
                            icon='asterisk'
                            placeholder='Confirmar Senha' 
                            secureTextEntry={true}
                            value={this.state.confirmPassword} 
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            style={styles.input} />
                    }

                    <TouchableOpacity onPress={this.siginOrSigup} disabled={!validaForm}>
                        <View style={[styles.button, !validaForm ? {backgroundColor: '#aaa'} : {} ]}>
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
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7,
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 15,
        fontWeight: 'bold'
    }
});
