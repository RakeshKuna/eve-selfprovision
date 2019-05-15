
const Validations = function Validations(values) {
  const errors = {};
  let formIsValid = true;
  if (!values.username || values.username.trim() === '') {
    errors.username = 'UserName is Required';
    formIsValid = false;
  }

  if (!values.password || values.password.trim() === '') {
    errors.password = 'Password is Required';
    formIsValid = false;
  }
  return { Validations: errors, isFormValid: formIsValid };
};
const BuValidations = function BuValidations(values) {
  const errors = {};
  let formIsValid = true;

  if (!values.channelPartnerName || values.channelPartnerName.trim() === '') {
    errors.channelPartnerName = 'Service Provider Name is required';
    formIsValid = false;
  }
  if (!values.channelPartnerId || values.channelPartnerId.trim() === '') {
    errors.channelPartnerId = 'Service Provider Id is required';
    formIsValid = false;
  }
  if (!values.chargedCurrency || values.chargedCurrency === 'Select') {
    errors.chargedCurrency = 'Please select your charged Currency';
    formIsValid = false;
  }
  if (!values.timeZone || values.timeZone === 'Select') {
    errors.timeZone = 'Please select your timeZone';
    formIsValid = false;
  }
  if (!values.channelPartnerType || values.channelPartnerType === 'Select') {
    errors.channelPartnerType = 'Please select your BusinessModel';
    formIsValid = false;
  }
  if (!values.currency || values.currency === 'Select') {
    errors.currency = 'Please select your currency';
    formIsValid = false;
  }
  if (!values.country || values.country === 'Select') {
    errors.country = 'Please select your country code';
    formIsValid = false;
  }
  if (!values.state || values.state === 'Select') {
    errors.state = 'Please select your state';
    formIsValid = false;
  }
  if (!values.county || values.county === 'Select') {
    errors.county = 'Please select your country';
    formIsValid = false;
  }
  if (!values.city || values.city === 'Select') {
    errors.city = 'Please select your city';
    formIsValid = false;
  }
  if (!values.taxType || values.taxType === 'Select') {
    errors.taxType = 'Please select your taxType';
    formIsValid = false;
  }
  if (!values.themeColor || values.themeColor === 'Select') {
    errors.themeColor = 'Please select your themecolor';
    formIsValid = false;
  }
  return { BuValidations: errors, isFormValid: formIsValid };
};
export default { Validations, BuValidations };
