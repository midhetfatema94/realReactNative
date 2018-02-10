import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Alert } from 'react-native';

import { emailLogin, facebookLogin, googleLogin } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {
    
    constructor(props) {
        super(props);
    }

    componentWillMount () {
        this.setState({ email: "", password: "" })
    }

    loginUser() {
        const { email, password } = this.state;
        let passwordValidationValues = this.validatePassword(password)
        if (!this.validateEmail(email) || !passwordValidationValues.boolValue) {
            Alert.alert(
                'Validation Error',
                'Form Incomplete',
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            )
            return
        }
        console.log("access token", email, password);
        this.props.callEmailLogin(email, password);
    }

    googleSignIn() {
        this.props.gLogin();
    }

    validateEmail = (email) => {
        console.log('email', email);
        // let emailRegEx = /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}/;
        let emailRegEx = /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
        console.log('email validation', emailRegEx.test(email), 
        email)
        return emailRegEx.test(email) && email
    }

    validatePassword = (password) => {
        console.log('password', password);
        let alphabetRegEx = /[A-Za-z]/
        let numberRegEx = /[0-9]/
        let specialCharactersRegEx = /[!-*._+-]/

        function passwordLengthCheck(text) {
            return text.length >=4 && text.length <=12;
        }

        var strength = 0
        if (alphabetRegEx.test(password)) {
            strength += 1
        }
        if (numberRegEx.test(password)) {
            strength += 1
        }
        if (specialCharactersRegEx.test(password)) {
            strength += 1
        }
        
        console.log('password validation', passwordLengthCheck(password), !password, strength > 0, strength)
        let boolValue = passwordLengthCheck(password) && password && strength > 0
        return {boolValue, strength}
    }

    emailChanged(text) {
        this.setState({ email: text })
        // this.props.emailChanged(text)
    }

    passwordChanged(text) {
        this.setState({ password: text })
        // this.props.passwordChanged(text)
    }

    render() {
        console.log("here", this.state);
        return (
            <Card>
                <CardSection>
                    <Input 
                        label = "Email"
                        placeholder="Email"
                        onChangeText={this.emailChanged.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        label = "Password"
                        isPassword
                        placeholder="Password"
                        onChangeText={this.passwordChanged.bind(this)}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.loginUser.bind(this)}>
                        Email Login
                    </Button>
                </CardSection>
                {/* <CardSection>
                    <Button>
                        Login with Facebook
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.googleSignIn.bind(this)}>
                        Login with Google
                    </Button>
                </CardSection> */}
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.HomeReducer.isLoading,
    error: state.HomeReducer.error,
    userInfo: state.HomeReducer.data
});

const mapDispatchToProps = (dispatch) => ({
    callEmailLogin: (email, pass) => dispatch(emailLogin(email, pass)),
    fbLogin: (text) => dispatch(facebookLogin(text)),
    gLogin: () => dispatch(googleLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);