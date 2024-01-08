import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import classes from "./quiz.module.css";

const QuizCategory = ({title}) => {
    return (
        <ListGroup className={classes.category_card} key={title}>
            <Card >
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <br />
                    </Card.Text>
                    <Card.Text>
                        An klicken und Quiz über {title.toLowerCase()} starten
                    </Card.Text>

                </Card.Body>
                <Card.Footer><button className='btn'><NavLink to={"/quiz/" + title.toLowerCase()}>Start</NavLink></button></Card.Footer>
            </Card>
        </ListGroup>
    );

}

export default QuizCategory;