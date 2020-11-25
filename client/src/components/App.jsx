import React from "react";
import {Route, Switch} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import CallbackPage from "./CallbackPage";
import {Main} from "./Main";

export const App = () => (
    <Container className="center">
        <div className={"iphone"}>
            <Row className="app">
                <Col lg={{size: 12}} style={{paddingTop: "30px"}}>
                    <Switch>
                        <Route exact path="/" component={Main}/>
                        <Route exact path="/callback" component={CallbackPage}/>
                    </Switch>
                </Col>
            </Row>
        </div>
    </Container>
);

export default App;