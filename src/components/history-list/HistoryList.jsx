import React from "react";
import "./history-list.styles.scss";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { clearLocalStorage } from "../../api/local.api";

const HistoryList = ({ historyList, setHistoryList }) => {
  const handleClick = () => {
    console.log("History cleared");
    clearLocalStorage();
    setHistoryList([]);
  };

  return (
    <div className='history-list-main'>
      <div className='flex-container'>
        <div className='flex-header'>
          <div className='flex-hcell'>Data</div>
          <div className='flex-hcell'>Przed konwersją</div>
          <div className='flex-hcell'></div>
          <div className='flex-hcell'>Po konwersji</div>
        </div>
        <div className='flex-overflow'>
          {historyList.length !== 0 ? (
            historyList.map((element, index) => (
              <div key={index} className='flex-trow'>
                <div className='flex-tcell'>{element.today}</div>
                <div className='flex-tcell'>{element.before}</div>
                <div className='flex-tcell'>
                  <FontAwesomeIcon
                    className=''
                    icon={faLongArrowAltRight}
                    data-config-id='icon'
                    size='1x'
                    color='#fff'
                  />
                </div>
                <div className='flex-tcell'>{element.after}</div>
              </div>
            ))
          ) : (
            <div className='flex-empty'>
              Brak historii konwersji walut
            </div>
          )}
        </div>
      </div>
      <Button
        variant='link'
        className='history-list-clearbtn'
        onClick={handleClick}
      >
        Wyczyść historię
      </Button>
    </div>
  );
};

export default HistoryList;
