import React from 'react'
import { useRouteError } from "react-router-dom";

type routeError = { [key: string]: any }

const UnknownError = () => {
    const error = useRouteError() as routeError;

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
        </div>
    );
}

export default UnknownError