import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import Dasboard from "../layouts/Dashboard";
import ReviewClaimsTable from "./components/ReviewClaimsTable";
const ReviewClaims: React.FC<any> = () => {
  return (
    <>
      <Dasboard>
        
        <ReviewClaimsTable />
      </Dasboard>
    </>
  );
};

export default ReviewClaims;
