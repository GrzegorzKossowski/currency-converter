import React from "react";
import "./history-tab.styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const HistoryTab = ({ isHistoryOn = false, ...otherProps }) => {
  return (
    <div className='history-tab-main'>
      {isHistoryOn && (
        <Link to={`/${isHistoryOn ? "" : "history"}`} className='history-tab-link'>
          <FontAwesomeIcon
            className='conv-arrows'
            icon={faTimes}
            data-config-id='icon'
            size='1x'
            color='#fff'
          />
        </Link>
      )}
      <Link to={`/${isHistoryOn ? "" : "history"}`}>
        <span className='rotate'>Historia</span>
      </Link>
    </div>
  );
};

export default HistoryTab;
