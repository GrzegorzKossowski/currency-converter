import React, { useState, useEffect } from "react";
import "./home-page.styles.scss";
import { Container, Row, Col, Modal, Alert } from "react-bootstrap";
import Converter from "../../components/converter/Converter";
import HistoryList from "../../components/history-list/HistoryList";
import HistoryTab from "../../components/history-tab/HistoryTab";
import { fetchLocalStorage } from "../../api/local.api";
import ApiAlert from "../../components/api-alert/ApiAlert";

const initialState = {
  today: new Date().toJSON().slice(0, 10).split("-").reverse().join("."),
  fromCurrency: "",
  toCurrency: "",
  amount: 0,
  score: 0
};

const HomePage = ({ isHistoryOn = false, ...otherProps }) => {
  const [formState, setFormState] = useState(initialState);
  const [historyList, setHistoryList] = useState(() => {
    let newLocal = fetchLocalStorage("history");
    return newLocal ? newLocal : [];
  });

  return (
    <>
      <Container fluid className='home-page-container'>
        <Row>
          <Col>
            <div className='home-page-main'>
              <Converter
                isHistoryOn={isHistoryOn}
                formState={formState}
                setFormState={setFormState}
                historyList={historyList}
                setHistoryList={setHistoryList}
              />
              {isHistoryOn && (
                <HistoryList
                  historyList={historyList}
                  setHistoryList={setHistoryList}
                />
              )}
              <HistoryTab isHistoryOn={isHistoryOn} />
            </div>
          </Col>
        </Row>
        <ApiAlert formState={formState}/>
      </Container>
    </>
  );
};

export default HomePage;
