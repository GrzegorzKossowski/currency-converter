import React, { useState, useEffect } from "react";
import "./converter.styles.scss";
// import { Form, Field } from "react-final-form";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import {
  fetchCurrenciesMock,
  fetchConvertMock,
  fetchConversionData,
  fetchAllCurrencies,
  getUsage
} from "../../api/converter.api";
import {
  fetchLocalStorage,
  updateLocalStorage,
  clearLocalStorage
} from "../../api/local.api";

const Converter = props => {
  const { formState, setFormState, historyList, setHistoryList } = props;
  const [currencies, setCurrencies] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  let history = useHistory();

  useEffect(() => {
    getAllCurrencies();
    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    setIsDisabled(true);
    if(formState.amount > 0) {
      setIsDisabled(false);
    }
  },[formState.amount])

  const getAllCurrencies = () => {
    fetchCurrenciesMock()
      // fetchAllCurrencies()
      .then(data => {
        const currencies = Object.keys(data.results)
          .map(key => data.results[key].id)
          .sort();
        setCurrencies(currencies);
        return currencies;
      })
      .then(data => {
        setFormState({
          ...formState,
          fromCurrency: data[0],
          toCurrency: data[0]
        });
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchConvertMock()
      // fetchConversionData(formState.fromCurrency, formState.toCurrency)
      .then(data => {
        let eRate = Object.values(data)[0];
        let newScore = eRate * formState.amount;
        setFormState({
          ...formState,
          score: newScore
        });
        return newScore;
      })
      .then(newScore => {
        let newConversion = {
          today: new Date()
            .toJSON()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("."),
          before: formState.amount + " " + formState.fromCurrency,
          after: parseFloat(newScore).toFixed(2) + " " + formState.toCurrency
        };
        setHistoryList([newConversion, ...historyList]);
        updateLocalStorage("history", newConversion);
      })
      .then(() => {
        history.push("history");
      });
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className='converter-main'>
      <Form onSubmit={handleSubmit} className='converter-form'>
        <h2>Konwerter walut</h2>
        <Form.Group>
          <Form.Label className='form-input-label'>
            <div>Wpisz kwotę</div>
            <div>{formState.fromCurrency}</div>
          </Form.Label>
          <Form.Control
            as='input'
            name='amount'
            value={formState.amount}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='form-input-label'>
            <div>Wynik</div>
            <div>{formState.toCurrency}</div>
          </Form.Label>
          <Form.Control readOnly value={formState.score} />
        </Form.Group>
        <Form.Group>
          <div className='converter-currency-select-group'>
            <Form.Control
              className='conv-select'
              as='select'
              name='fromCurrency'
              value={formState.fromCurrency}
              onChange={handleChange}
            >
              {currencies.map((element, index) => (
                <option key={index} value={element} name={element}>
                  {element}
                </option>
              ))}
            </Form.Control>
            <FontAwesomeIcon
              className='conv-arrows'
              icon={faExchangeAlt}
              data-config-id='icon'
              size='1x'
              color='#000'
            />
            <Form.Control
              className='conv-select'
              as='select'
              name='toCurrency'
              value={formState.toCurrency}
              onChange={handleChange}
            >
              {currencies.map((element, index) => (
                <option key={index} value={element} name={element}>
                  {element}
                </option>
              ))}
            </Form.Control>
          </div>
        </Form.Group>
        <button className={`converter-btn ${isDisabled ? 'disabled-btn' : ''}`} type='submit' disabled={isDisabled}>
          KONWERTUJ
        </button>
      </Form>
    </div>
  );
};

export default Converter;
