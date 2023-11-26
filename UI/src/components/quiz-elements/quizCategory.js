import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import classes from "./quiz.module.css";

const QuizCategory = (props) => {
    return (
        <ListGroup className={classes.category_card} key={props.title}>
            <Card >
                <Card.Header>{props.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <br />
                    </Card.Text>
                    <Card.Text>
                        An klicken und Quiz über {props.title.toLowerCase()} starten
                    </Card.Text>

                </Card.Body>
                <Card.Footer><button className='btn'><NavLink to={"/quiz/" + props.title.toLowerCase()}>Start</NavLink></button></Card.Footer>
            </Card>
        </ListGroup>
    );

}

export default QuizCategory;