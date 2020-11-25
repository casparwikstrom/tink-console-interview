import React from "react";
import {Route, Switch} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import CallbackPage from "./CallbackPage";
import {Main} from "./Main";

export const App = () => (
    <Container className="center">
        <div className={"iphone"}>
            <Row>
                <Col>
                    <a
                        href="/"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "inline-flex",
                            alignItems: "center",
                            marginTop: 15
                        }}
                    >
                        <span className="circle"/>
                        <h2 style={{margin: 0}}>Example</h2>
                    </a>
                </Col>
            </Row>
            <Row className="app">
                <Col lg={{size: 12}} style={{paddingTop: "70px"}}>
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