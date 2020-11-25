import React from "react";
import PropTypes from "prop-types";
import {getCurrency} from "../utils/getCurrency";
import {formatNumber, formatDate} from "../utils/Format";
import {getImage} from "../utils/getImage";

export const Transactions = ({data}) => {
    /* var stringSimilarity = require('string-similarity');


     var similarity = stringSimilarity.compareTwoStrings('healed', 'sealed');*/
    console.log("datadatadatadatadatadatadata", data)
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


    /*const transactions = transc.map(result => {*/
    const transactions = data.map(result => {
        const transaction = result.data;
        /* const category = data.response.categoryData.find(
             category => category.id === transaction.categoryId
         );*/

        const redefined = transaction.formattedDescription(" ");
        const imagename = redefined[0]
        console.log("imagename", imagename)

        return (
            <div className={"test"}>
                <img src={`http://logo.clearbit.com/${imagename}.se`} alt="testimg"/>
                <p key={transaction.id}>
                    <b>{formatDate(new Date(transaction.date))}</b>
                    <br/>
                    {transaction.description}
                    <br/>
                    {formatNumber(transaction.amount)}
                    <br/>
                </p>
            </div>
        );
    });

    return (

        <div>
            <h4 className="pink">Some of your transactions</h4>
            <div style={{margin: "30px"}}>{transactions}</div>
        </div>
    );
};

Transactions.propTypes = {
    data: PropTypes.object.isRequired
};

export default Transactions;
