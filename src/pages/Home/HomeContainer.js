import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

// The contained:
import Home from './Home';

// redux actions:
import { enterAutoComplete } from '../../reduxxx/autoComplete/actions';
// validationSchema:
import validationSchema from './validationSchema';

// Connect's 1st action:
const mapStateToProps = (state, props) => {
  return {
    results: state.autoComplete.results || [],
  };
};

// Connect's 2nd action:
const mapDispatchToProps = (dispatch) => {
  return {
    enterAutoComplete: (data) => dispatch(enterAutoComplete(data)),
  };
};

// Formik's 1st action:
const mapPropsToValues = () => {
  const initialValues = { searchedText: '' };
  return initialValues;
};

// Formik's 2nd action:
const handleSubmit = async (
  values,
  { props: {}, setSubmitting, resetForm }
) => {
  const castValues = validationSchema.cast(values);
  console.log('form submitted with:', castValues);
  setSubmitting(false);
  resetForm();
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues,
    validationSchema,
    // validateOnChange: false,
    validateOnBlur: false,
    handleSubmit,
  })
)(Home);
