import React, { useEffect, useState } from "react";
import Dasboard from "../layouts/Dashboard";
import AwaitingPaymentsTable from "./components/AwaitingPaymentsTable";

const AwaitingPayments: React.FC<any> = () => {
  return (
    <>
      <Dasboard>
        
        <AwaitingPaymentsTable/>

      </Dasboard>
    </>
  );
};

export default AwaitingPayments;
