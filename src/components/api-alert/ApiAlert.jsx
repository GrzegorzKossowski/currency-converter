import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { fetchExpenditure } from "../../api/converter.api";

const ApiAlert = ({formState, ...otherProps}) => {
  const [expenditure, setExpenditure] = useState(0);

  useEffect(() => {
    fetchExpenditure().then(data => {
      setExpenditure(data);
    });
    // eslint-disable-next-line
  }, [formState.score]);

  return (
    <Alert
      variant={`${expenditure.usage > 80 ? "danger" : "primary"}`}
      className='home-usage-alert'
    >
      Free API version. 100 usages per hour.{" "}
      {expenditure && <span>{calculateUsage(expenditure.usage)} left.</span>}
    </Alert>
  );
};

export default ApiAlert;

const calculateUsage = (usage, limit = 100) => {
  return limit - usage <= 0 ? 0 : limit - usage;
};
