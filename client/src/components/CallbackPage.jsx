import React from "react";
import { Button } from "reactstrap";
import ReactRouterPropTypes from "react-router-prop-types";
import {useCallbackData} from "../hooks/useCallbackData";
import TransactionPage from "./TransactionPage";

export const CallbackPage = ({ location }) => {
    const { loading, error, data } = useCallbackData(location);
    const message = new URLSearchParams(location).get("message");
    console.log("loadingloadingloadingloadingloading callback", loading)

    return (
        <div className="wrapper">
            <TransactionPage loading={loading} data={data} error={error} />
            <p style={{ fontSize: "18px", paddingTop: "40px" }}>{message}</p>
            <Button className={"grad red"} href="/">
                Take me back
            </Button>
        </div>
    );
};

CallbackPage.propTypes = {
    location: ReactRouterPropTypes.location.isRequired
};

export default CallbackPage;
