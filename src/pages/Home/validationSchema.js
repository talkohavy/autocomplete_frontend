import * as yup from 'yup';

export default yup.object().shape({
  searchedText: yup.string().required('required'),
});
