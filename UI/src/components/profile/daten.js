import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import classes from "../../css/profile.module.css"

const Daten = ({ username, email, id }) => {

    return (
        <div className={classes.daten}>
            <h2>User Daten : </h2>
            <br />
            <InputGroup size="lg" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">User ID</InputGroup.Text>
                <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    value={id}
                    readOnly={true}
                />
            </InputGroup>

            <InputGroup size="lg" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Username</InputGroup.Text>
                <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    value={username}
                    readOnly={true}
                />
            </InputGroup>

            <InputGroup size="lg" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
                <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    value={email}
                    readOnly={true}
                />
            </InputGroup>
        </div>
    );
}

export default Daten;