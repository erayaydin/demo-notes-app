import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import "./Login.css";
import {Auth} from "aws-amplify";
import {useAppContext} from "../lib/contextLib.ts";
import LoaderButton from "../components/LoaderButton.tsx";
import {onError} from "../lib/errorLib.ts";
import { useFormFields } from "../lib/hooksLib";

export default function Login() {
    const { userHasAuthenticated } = useAppContext();

    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.signIn(fields.email, fields.password);
            userHasAuthenticated(true);
        } catch (error) {
            onError(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Stack gap={3}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            size="lg"
                            type="email"
                            value={fields.email}
                            required
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            size="lg"
                            type="password"
                            value={fields.password}
                            required
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    <LoaderButton
                        size="lg"
                        type="submit"
                        isLoading={isLoading}
                        disabled={fields.email.length == 0 || fields.password.length == 0}
                    >
                        Login
                    </LoaderButton>
                </Stack>
            </Form>
        </div>
    );
}
