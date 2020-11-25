import React from "react";
import { Button } from "reactstrap";
import ReactRouterPropTypes from "react-router-prop-types";
import {useCallbackData} from "../hooks/useCallbackData";
import TransactionPage from "./TransactionPage";

const getHeaderProps = error =>
    error
        ? {
            text: "Something went wrong",
            emoji: "sad"
        }
        : {
            text: "Your bank was successfully connected!",
            emoji: "tada"
        };

export const CallbackPage = ({ location }) => {
    const { loading, error, data } = useCallbackData(location);
    console.log("callbackpage", data)
    const message = new URLSearchParams(location).get("message");
    const headerProps = getHeaderProps(error);

    return (
        <div>
            {/*<Header {...headerProps} />*/}
            <TransactionPage loading={loading} data={data} error={error} />
            <p style={{ fontSize: "18px", paddingTop: "40px" }}>{message}</p>
            <Button style={{ margin: "30px" }} href="/">
                Take me back
            </Button>
        </div>
    );
};

CallbackPage.propTypes = {
    location: ReactRouterPropTypes.location.isRequired
};

export default CallbackPage;
