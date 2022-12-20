import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import "./tabX.css";

const ShippingTab = () =>
{
    return (
        <Form className='text-dark'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Pick Up Location</Form.Label>
                <Form.Control type="location" placeholder="Zip or City,State or Landmark" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Drop Location(optional)</Form.Label>
                <Form.Control type="location" placeholder="Zip or City,State or Landmark" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Pick Up Date</Form.Label>
                <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3 text-center">
                <Link to="/shipping">
                    <Button className="center text-white" variant="blue" size="lg">
                        Get Rates
                    </Button>
                </Link>
            </Form.Group>
        </Form>
    );
}

export default ShippingTab;
