import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import classes from "./quiz.module.css";

const Quiz = (props) => {
    return (
        <ListGroup className={classes.category_card} key={props.title}>
            <Card >
                <Card.Header>{props.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Beschreibung
                    </Card.Text>
                    <Card.Text>
                        {props.beschreibung}
                    </Card.Text>
                </Card.Body>
                <Card.Footer><button className='btn'><NavLink to={"/quiz/answerQuiz/" + props.quizId}>Start</NavLink></button></Card.Footer>
            </Card>
        </ListGroup>
    );

}

export default Quiz;