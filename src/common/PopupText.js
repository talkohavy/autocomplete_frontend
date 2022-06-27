import React from 'react';

export default function PopupText({ listOfWords }) {
  //------------------- Render GUI ----------------------
  return (
    <>
      {listOfWords.length > 0 && (
        <div className='flexColumnCenter popupText'>
          {showListOfWords(listOfWords)}
        </div>
      )}
    </>
  );
}

function showListOfWords(listOfWords) {
  if (listOfWords) {
    const jsxArr = [];
    for (let i = 0; i < listOfWords.length; i++) {
      const jsxElement = (
        <div key={i} className='textItem'>
          {' '}
          {listOfWords[i]}{' '}
        </div>
      );
      jsxArr.push(jsxElement);
    }
    return jsxArr;
  }
}
