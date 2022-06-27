import React from 'react';
import clsx from 'clsx';

import AppStyles from '../../app.module.css';
import MyStyles from './home.module.css';
import FormikControl from '../../common/Formik/formikControl';

export default function Home({
  results,
  enterAutoComplete,
  // Formik variables:
  values,
  errors,
  touched,
  isSubmitting,
  handleSubmit,
  setFieldValue,
  // isValid, setFieldValue, setFieldTouched,
}) {
  //------------------- Render GUI ----------------------
  return (
    <div className={MyStyles.mainContent}>
      <h1 className={MyStyles.pageTitle}>
        The most amazing AutoComplete ever!
      </h1>
      <div className={AppStyles.flexCenter}>
        <FormikControl
          control='autoComplete'
          type='text'
          name='searchedText'
          isError={touched['searchedText'] && errors['searchedText']}
          errorName={'searchedText'}
          errorType={errors['searchedText']}
          labelContent={'Insert a word'}
          labelOnEmptyList={'List is empty...'}
          value={values.searchedText}
          options={results}
          getOptionLabel={(option) => option}
          setFieldValue={setFieldValue}
          langCode={'en'}
          isRTL={false}
          refreshList={enterAutoComplete}
        />
      </div>
    </div>
  );
}
