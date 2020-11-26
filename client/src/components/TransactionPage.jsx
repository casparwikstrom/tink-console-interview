import React from "react";
import PropTypes from "prop-types";
import {Col, Row} from "reactstrap";
import Spinner from "./Spinner";
import Transactions from "./Transactions";

export const TransactionPage = ({data, error, loading}) => {
    console.log("loading", loading);
    if (error) {
        return <noscript/>;
    }

    if (loading) {
        return <Spinner width="50px" image={"./spinner.svg"}/>;
    }

    if (!data) {
        return <noscript/>;
    }

    return (
        <Row>
            <Col lg={{size: 12}}>
                <Transactions data={data.response}/>
            </Col>
        </Row>
    );
};

TransactionPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    error: PropTypes.string
};

export default TransactionPage;
