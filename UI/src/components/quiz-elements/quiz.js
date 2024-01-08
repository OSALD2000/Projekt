import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import classes from "./quiz.module.css";

const Quiz = ({title, beschreibung, quizId}) => {
    return (
        <ListGroup className={classes.category_card} key={new Date() * Math.random()}>
            <Card >
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Beschreibung
                    </Card.Text>
                    <Card.Text>
                        {beschreibung}
                    </Card.Text>
                </Card.Body>
                <Card.Footer><button className='btn'><NavLink to={"/quiz/answerQuiz/" + quizId}>Start</NavLink></button></Card.Footer>
            </Card>
        </ListGroup>
    );

}

export default Quiz;