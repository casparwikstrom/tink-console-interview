import React, {useState} from "react";
import {BasicDropdown} from "./BasicDropdown";
import AuthorizationLink from "./AuthorizationLink";

export const Main = () => {
    const [market, setMarket] = useState("SE");
    const [locale, setLocale] = useState("en_US");

    return (
        <div>
            <div className="logo-image">
                <img src="//logo.clearbit.com/tink.com?size=80"/>
            </div>
            <div className="tink-h2">
                <h2 style={{margin: 0}}>Tink Console</h2>
            </div>
            <div>
                <p>
                    Check out your top merchant this year!
                </p>
            </div>
            <div style={{padding: "20px 0 20px 0"}}>
                <BasicDropdown
                    name="Choose a market"
                    items={[
                        "AT",
                        "BE",
                        "DE",
                        "DK",
                        "ES",
                        "FI",
                        "GB",
                        "IT",
                        "NL",
                        "NO",
                        "PT",
                        "SE"
                    ]}
                    onSelect={setMarket}
                    style={{marginBottom: "30px"}}
                />
            </div>

            <div style={{padding: "20px 0 20px 0"}}>
                <BasicDropdown
                    name="Choose a locale"
                    items={[
                        "da_DK",
                        "de_DE",
                        "en_US",
                        "es_ES",
                        "fi_FI",
                        "fr_FR",
                        "it_IT",
                        "nl_NL",
                        "no_NO",
                        "pt_PT",
                        "sv_SE"
                    ]}
                    onSelect={setLocale}
                    style={{marginBottom: "30px"}}
                />
            </div>

            <AuthorizationLink
                scope="transactions:read"
                market={market}
                locale={locale}
            />
        </div>
    );
};

export default Main;
