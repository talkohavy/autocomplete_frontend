// ---------------------------------
// Rule number 1: credit card number
// ---------------------------------
export function cardNumberRule(e, newValue) {
  if (
    (isNaN(parseInt(e.nativeEvent.data)) &&
      !e.nativeEvent.inputType.startsWith('delete')) ||
    newValue.length > 19
  ) {
    // dont change if NOT a number and NOT delete or backspace and length is over 19!
    return { change: false, newValue: null };
  }
  // Step 2: alter value
  newValue = newValue.replace(/ /g, '');
  if (newValue.length >= 13) {
    // Case 1: Add +3 spaces
    newValue =
      newValue.substring(0, 4) +
      ' ' +
      newValue.substring(4, 8) +
      ' ' +
      newValue.substring(8, 12) +
      ' ' +
      newValue.substring(12, 16);
  } else {
    if (newValue.length >= 9) {
      // Case 2: Add +2 space
      newValue =
        newValue.substring(0, 4) +
        ' ' +
        newValue.substring(4, 8) +
        ' ' +
        newValue.substring(8);
    } else {
      if (newValue.length >= 5) {
        // Case 3: Add +1 space
        newValue = newValue.substring(0, 4) + ' ' + newValue.substring(4);
      }
    }
  }
  // Step 3: return new altered value
  return { change: true, newValue };
}

// -------------------------------------------
// Rule number 2: only alphaNumeric characters
// -------------------------------------------
export function alphaNumericRule(maxLength = 25) {
  return (e, newValue) => {
    // Step 1: when not to change
    if (!/^(?!.*\s{2,})(?!^ )[a-zA-Zא-ת0-9_\s]{0,25}$/.test(newValue)) {
      // dont change if NOT a number and NOT delete or backspace and length is over 2!
      return { change: false, newValue: null };
    }
    // Step 2: alter value
    // Step 3: return new altered value
    return { change: true, newValue };
  };
}

// ---------------------------
// Rule number 3: numbers only
// ---------------------------
export function numbersOnlyRule(maxLength = 32) {
  return (e, newValue) => {
    // Step 1: when not to change
    if (
      newValue.length > maxLength ||
      (isNaN(parseInt(e.nativeEvent.data)) &&
        !e.nativeEvent.inputType.startsWith('delete'))
    ) {
      // dont change if NOT a number and NOT delete or backspace and length is over 3!
      return { change: false, newValue: null };
    }
    // Step 2: alter value
    // Step 3: return new altered value
    return { change: true, newValue };
  };
}

// -----------------------------------------
// Rule number 4: size limit and trim spaces (beginning & end)
// -----------------------------------------
export function sizeLimitAndTrimedSpaces(maxLength = 25) {
  return (e, newValue) => {
    // Step 1: when not to change
    if (
      newValue.length > maxLength ||
      !/^(?!.*\s{2,})(?!^ )(.*){0,25}$/.test(newValue)
    ) {
      // dont change if NOT a number and NOT delete or backspace and length is over 2!
      return { change: false, newValue: null };
    }
    // Step 2: alter value
    // Step 3: return new altered value
    return { change: true, newValue };
  };
}

// ---------------------------------------
// Rule number 5: size limit and no spaces (for passwords)
// ---------------------------------------
export function sizeLimitAndNoSpaces(maxLength = 25) {
  return (e, newValue) => {
    // Step 1: when not to change
    if (
      newValue.length > maxLength ||
      !/^(?!.*\s{1,})(.*){0,25}$/.test(newValue)
    ) {
      // dont change if NOT a number and NOT delete or backspace and length is over 2!
      return { change: false, newValue: null };
    }
    // Step 2: alter value
    // Step 3: return new altered value
    return { change: true, newValue };
  };
}
