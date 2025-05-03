import React, {useContext, useEffect} from 'react';
import {Context} from "../index";

const FullReport = () => {
    const {productStore, agentStore} = useContext(Context)
    useEffect(() => {
        productStore.fetchReport().then(res => productStore.fetchAgentReport(productStore.report[1].ProductId))
        agentStore.fetchReport()
    })
    return (
        <div>
            REPOEOREOREPO
        </div>
    );
};

export default FullReport;