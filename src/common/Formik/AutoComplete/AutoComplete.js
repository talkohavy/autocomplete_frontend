import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Field } from 'formik';

import MyStyles from './autoComplete.module.css';
import AppStyles from '../../../app.module.css';
import { errorsMap } from './constants';
import { imgDownArrow } from '../../../paths/images';

const OPTION_HEIGHT = 40;
const ITEMS_PER_SCROLL = 5;

export default function AutoComplete({
  name,
  errorName = name,
  labelContent,
  labelOnEmptyList,
  options,
  value,
  isError,
  errorType,
  getOptionLabel,
  isRTL,
  setFieldValue,
  refreshList,
}) {
  // initial option for initial typedText:
  const initialOption = options.find((option) => option === value);

  // all useStates:
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredOption, setHoveredOption] = useState({ index: -1, key: 'up' });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // all useRefs:
  const optionsMenu = useRef(null);

  const isFloating = isFocused || value !== '';

  // on value change: a) filter options. b) reset hoveredOption
  useEffect(() => {
    setHoveredOption({ index: 0, key: 'up' });
  }, [value, options]);

  // Toggle menu - Open/close dropdown
  useEffect(() => {
    setIsMenuOpen(isFocused);
  }, [isFocused]);

  // Toggle menu - Open/close dropdown
  useEffect(() => {
    setShowMenu(isMenuOpen);
  }, [isMenuOpen]);

  // Scroll with key touch up/down:
  useEffect(() => {
    if (showMenu) {
      let newStartPos = hoveredOption.index;
      // Down arrow:
      if (hoveredOption.key === 'down') {
        // Case 1: loop case (from length-1 to 0)
        if (newStartPos === 0) {
          setScrollPosition(newStartPos);
          optionsMenu.current.scrollTo(0, newStartPos * OPTION_HEIGHT);
        } else {
          // Case 2: simple case (go down)
          newStartPos = newStartPos - ITEMS_PER_SCROLL;
          if (newStartPos >= scrollPosition) {
            // Scroll if out of dead zone:
            setScrollPosition(newStartPos);
            optionsMenu.current.scrollTo(0, newStartPos * OPTION_HEIGHT);
          }
        }
      } else {
        // Up arrow:
        // Case 1: loop case (from 0 to length-1)
        if (newStartPos === options.length - 1) {
          setScrollPosition(newStartPos);
          optionsMenu.current.scrollTo(0, newStartPos * OPTION_HEIGHT);
        } else {
          // Case 2: simple case (go up)
          if (newStartPos < scrollPosition) {
            // Scroll if out of dead zone:
            setScrollPosition(newStartPos);
            optionsMenu.current.scrollTo(0, newStartPos * OPTION_HEIGHT);
          }
        }
      }
    }
  }, [hoveredOption.index]);

  // Render filtered options: (or an 'empty-list' message)
  function showOptions() {
    // Cover the empty list case:
    if (options.length === 0) {
      return (
        <li key={0} tabIndex='-1'>
          <button
            className={MyStyles.dropdownOption}
            type='button'
            tabIndex='-1'
          >
            <span className={MyStyles.optionLabel} tabIndex='-1'>
              {labelOnEmptyList}
            </span>
          </button>
        </li>
      );
    }
    // Case of list not empty:
    return options.map((option, i) => {
      return (
        <li key={i} tabIndex='-1'>
          <button
            className={clsx(
              MyStyles.dropdownOption,
              hoveredOption.index === i && MyStyles.optionOnHover,
              option === value && MyStyles.selectedOption
            )}
            onMouseDown={() => {
              setFieldValue(name, option);
              setIsFocused(false);
            }}
            type='button'
            tabIndex='-1'
          >
            <span className={MyStyles.optionLabel} tabIndex='-1'>
              {getOptionLabel(option)}
            </span>
          </button>
        </li>
      );
    });
  }

  // Clicked: ArrowDown ArrowUp Enter Esc
  const onActionButtons = (e) => {
    switch (e.code) {
      case 'ArrowDown':
        setIsFocused(true);
        setIsMenuOpen(true);
        if (hoveredOption.index < options.length - 1) {
          setHoveredOption({ index: hoveredOption.index + 1, key: 'down' });
        } else {
          setHoveredOption({ index: 0, key: 'down' });
        }
        break;
      case 'ArrowUp':
        setIsFocused(true);
        setIsMenuOpen(true);
        if (hoveredOption.index > 0) {
          setHoveredOption({ index: hoveredOption.index - 1, key: 'up' });
        } else {
          setHoveredOption({ index: options.length - 1, key: 'up' });
        }
        break;
      case 'Enter':
        if (hoveredOption.index > -1) {
          setFieldValue(name, options[hoveredOption.index]);
          setIsFocused(false);
        }
        break;
      case 'NumpadEnter':
        if (hoveredOption.index > -1) {
          setFieldValue(name, options[hoveredOption.index]);
          setIsFocused(false);
        }
        break;
      case 'Escape':
        setIsMenuOpen(false);
        break;
      default:
        return;
    }
  };

  //-------------- Render GUI ----------------
  return (
    <div
      className={clsx(MyStyles.wrapper, isFocused && MyStyles.wrapperOnFocus)}
      onKeyDown={onActionButtons}
      onBlur={() => {
        const lowercasedValue = value?.toString().toLowerCase() || '';
        for (let i = 0; i < options.length; i++) {
          if (
            lowercasedValue ===
            getOptionLabel(options[i]).toString().toLowerCase()
          ) {
            setFieldValue(name, options[i]);
            break;
          }
        }
        setTimeout(() => {
          setIsFocused(false);
        }, 250);
      }}
    >
      <div
        className={MyStyles.inputAndErrorWrapper}
        onFocus={() => {
          setIsFocused(true);
        }}
      >
        <div className={clsx(MyStyles.inputAndLabelWrapper)}>
          <label
            htmlFor={name}
            className={clsx(
              MyStyles.label,
              isFloating &&
                (isRTL ? MyStyles.labelOnFloatRtl : MyStyles.labelOnFloatLtr),
              AppStyles.flexCenter,
              isFocused
                ? MyStyles.labelOnFocus
                : isError && MyStyles.labelOnError
            )}
            style={!isRTL ? { left: 10 } : { right: 10 }}
          >
            {labelContent}
          </label>
          <Field>
            {(props) => {
              const { field } = props;
              return (
                <>
                  <input
                    type='text'
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => {
                      const text = e.target.value;
                      setFieldValue(name, text);
                      refreshList(text);
                    }}
                    onBlur={field.onBlur}
                    className={clsx(
                      MyStyles.input,
                      isHovered && MyStyles.inputOnHover,
                      isFocused
                        ? MyStyles.inputOnFocus
                        : isError && MyStyles.inputOnError
                    )}
                    autoComplete='off'
                    onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                    }}
                  />
                  <input
                    hidden
                    value={value}
                    onChange={field.onChange}
                    tabIndex='-1'
                  />
                  <div
                    className={clsx(MyStyles.arrowAndX)}
                    style={isRTL ? { left: '15px' } : { right: '15px' }}
                    tabIndex='-1'
                  >
                    <svg
                      className={clsx(
                        MyStyles.clearBtn,
                        isFocused && MyStyles.clearBtnVisible
                      )}
                      focusable='false'
                      viewBox='-3 -3 30 30'
                      aria-hidden='true'
                      onClick={() => {
                        setFieldValue(name, '');
                      }}
                      tabIndex='-1'
                    >
                      <g strokeWidth='0' fill='rgba(109, 109, 109, 0.9)'>
                        <path
                          strokeLinecap='round'
                          d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
                        ></path>
                      </g>
                    </svg>
                    <img
                      className={clsx(
                        MyStyles.arrow,
                        isFocused && MyStyles.arrowOnFocus
                      )}
                      src={imgDownArrow}
                      alt='down arrow'
                      tabIndex='-1'
                    />
                  </div>
                </>
              );
            }}
          </Field>
        </div>
        <div className={MyStyles.msgBlockOnError} tabIndex='-1'>
          {isError && !isFocused && errorsMap[`${errorType}`]}
        </div>
        {showMenu && (
          <ul className={MyStyles.menu} ref={optionsMenu}>
            {showOptions()}
          </ul>
        )}
      </div>
    </div>
  );
}
