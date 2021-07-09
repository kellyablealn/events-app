import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ErrorComponent = () => {
    const { error } = useSelector(state => state.async);

    return (
        <Segment placeholder>
            <Header textAlign='center' content={error?.message || 'Ops - we have an error'}/>
            <Button as={Link} to='/events' primary style={{marginTop: 20}} content='Return to events page'/>
        </Segment>
    )
}

export default ErrorComponent;
