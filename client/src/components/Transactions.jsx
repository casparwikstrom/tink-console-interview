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
                <div style={{margin: "30px"}}>
                    <p>You don’t seem to have any transactions.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="results-page">
            <img src={`http://logo.clearbit.com/spotify.se`} alt="test-img"/>
            <div style={{margin: "30px"}}>
                <h2>
                    {merchant.name}
                </h2>
            </div>
            <div style={{margin: "30px"}}>
                <p>
                    During 2020 you've spent{formatNumber(merchant.amount)} at {merchant.name}
                </p>
            </div>
        </div>
    );
};

Transactions.propTypes = {
    data: PropTypes.object.isRequired
};

export default Transactions;
