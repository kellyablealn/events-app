import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { socialLogin } from '../../app/firestore/firebaseService';

export default function SocialLogin() {
    const dispacth = useDispatch();

    function handleSocialLogin(provider) {
        dispacth(closeModal());
        socialLogin(provider);
    }

    return (
        <>
            <Button 
                icon='facebook' 
                type='button'
                fluid 
                onClick={() => handleSocialLogin('facebook')}
                color='facebook' 
                style={{marginBottom: 10}} 
                content='Login with Facebook'
            />                
            <Button 
                icon='google'
                type='button' 
                fluid 
                onClick={() => handleSocialLogin('google')}
                color='google plus' 
                content='Login with Google'
            />
        </>
    )
}