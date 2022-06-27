import React from 'react';
// all input components:
import AutoComplete from './AutoComplete';

export default function FormikControl({ control, ...rest }) {
  switch (control) {
    case 'autoComplete':
      return <AutoComplete {...rest} />;
    default:
      return null;
  }
}
