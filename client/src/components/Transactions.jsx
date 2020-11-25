import React from "react";
import PropTypes from "prop-types";
import {getCurrency} from "../utils/getCurrency";
import {formatNumber} from "../utils/Format";

export const Transactions = ({data}) => {
    const merchant = data.response;

    if (
        !data
    ) {
        return <noscript/>;
    }

    if (data.count === 0) {
        return (
            <div>
                <h4 className="pink">Some of your transactions</h4>
                <div style={{margin: "30px"}}>
                    <p>You don’t seem to have any transactions.</p>
                </div>
            </div>
        );
    }

    return (

        <div>
            <img src={`http://logo.clearbit.com/spotify.se`} alt="test-img"/>
            <div style={{margin: "30px"}}>{merchant.name}</div>
            <div style={{margin: "30px"}}>{formatNumber(merchant.amount)}</div>
        </div>
    );
};

Transactions.propTypes = {
    data: PropTypes.object.isRequired
};

export default Transactions;
