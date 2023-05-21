import propTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './TabList.scss';

function TabList({ files, activeId, unsaveIds, onTabClick, onCloseTab }) {
  return (
    <ul className="nav nav-pills">
      {files.map((file) => {
        const widthUnsaveMark = unsaveIds.includes(file.id);
        const fClassName = classNames({
          'nav-link': true,
          active: file.id === activeId,
          'width-unsave': widthUnsaveMark,
        });
        return (
          <li className="nav-item tablist-component" key={file.id}>
            <a
              href="#fakeUrl"
              className={fClassName}
              onClick={(e) => {
                e.preventDefault();
                onTabClick(file.id);
              }}
            >
              {file.title}
              <span
                className="ml-2 close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(file.id);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>

              {widthUnsaveMark && (
                <span className="rounded-circle ml-2 unsaved-icon" />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

TabList.propTypes = {
  files: propTypes.instanceOf(Array),
  unsaveIds: propTypes.instanceOf(Array),
};

TabList.defaultProps = {
  files: [],
  unsaveIds: [],
};

export default TabList;
