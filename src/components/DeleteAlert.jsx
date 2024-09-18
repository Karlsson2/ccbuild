import { Alert } from "react-bootstrap";

export default function DeleteAlert (message) {




    return (
        <>
        <Alert variant="success">
            <Alert.Heading>Delete successful</Alert.Heading>
            <p>{message}</p>
        </Alert>
        
        </>

    )
}