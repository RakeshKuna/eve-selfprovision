import config from 'config';
import axios from 'axios';
import { history, authHeader } from 'helpers';

const somethingWentWrong = 'Something went wrong please try again later';

const handleResponse = (response, fromService) => {
  // console.log(response.data[Object.keys[response.data][0]]);
  // console.log(response[`${fromService}Response`]);
  const responseData = response[`${fromService}Response`];
  if (responseData.responseCode === '1') {
    return responseData;
  }
  return false;
};

const login = (apiUser, apiPassword) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      AuthenticateCCBUserV1Request: {
        apiUser, apiPassword, isTokenRequired: 'T', channelPartnerID: 'CCB3'
      }
    }
  };
  return axios.post(`${config.API_URL}/ev/authenticateCCBUserV1`, requestOptions.body)
    .then((response) => {
      if (response.data && response.data.AuthenticateCCBUserV1Response) {
        if (response.data.AuthenticateCCBUserV1Response.failureMessage) {
          return Promise.reject(response.data.AuthenticateCCBUserV1Response.failureMessage.errorMessage);
        }
        const user = response.data.AuthenticateCCBUserV1Response;
        user.apiUser = apiUser;
        user.apiPassword = apiPassword;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
      // Something went wrong please try again later message
      return Promise.reject(somethingWentWrong);
    })
    .catch((error) => Promise.reject(error));
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  history.push('/login');
};

const getBuList = () => {
  const credentials = authHeader();
  credentials.channelPartnerID = 'CCB3';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Max-Age': 1 },
    body: { GetChannelPartnersForUserReq: credentials }
  };
  return axios.post(`${config.API_URL}/ccb/getChannelPartnersForUser`, requestOptions.body)
    .then((response) => handleResponse(response.data, 'GetChannelPartnersForUser')).catch((error) => Promise.reject(error));
};

const addBusinessUnit = (buObject) => {
  const credentials = authHeader();
  buObject = {
    ...credentials,
    ...buObject
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Max-Age': 1 },
    body: { CreateChannelPartnerRequestMsg: buObject }
  };
  return axios.post(`${config.API_URL}/ccb/createChannelPartner`, requestOptions.body)
    .then((response) => {
      if (response.data && response.data.CreateChannelPartnerResponseMsg) {
        if (response.data.CreateChannelPartnerResponseMsg.failureMessage) {
          return Promise.reject(response.data.CreateChannelPartnerResponseMsg.failureMessage.errorMessage);
        }
        return response.data.CreateChannelPartnerResponseMsg;
      }
      // Something went wrong please try again later message
      return Promise.reject(somethingWentWrong);
    })
    .catch((error) => Promise.reject(error));
};

const addUpdateProducts = (productObj) => {
  const credentials = authHeader();
  productObj = {
    ...credentials,
    ...productObj
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Max-Age': 1 },
    body: { UpdateProductDetailsRequestMessage: productObj }
  };
  return axios.post(`${config.API_URL}/ccb/updateProducts`, requestOptions.body)
    .then((response) => {
      if (response.data && response.data.UpdateProductDetailsResponseMessage) {
        if (response.data.UpdateProductDetailsResponseMessage.failureMessage) {
          return Promise.reject(response.data.UpdateProductDetailsResponseMessage.failureMessage.errorMessage);
        }
        return response.data.UpdateProductDetailsResponseMessage;
      }
      // Something went wrong please try again later message
      return Promise.reject(somethingWentWrong);
    })
    .catch((error) => Promise.reject(error));
};

const getProductsList = (channelPartnerId) => {
  const credentials = authHeader();
  credentials.channelPartnerID = channelPartnerId;
  credentials.dmaID = '001';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { GetProductsRequestMessage: credentials }
  };
  return axios.post(`${config.API_URL}/ccb/getProducts`, requestOptions.body)
    .then((response) => {
      if (response.data && response.data.GetProductsResponseMessage) {
        if (response.data.GetProductsResponseMessage.failureMessage) {
          return Promise.reject(response.data.GetProductsResponseMessage.failureMessage.errorMessage);
        }
        return response.data.GetProductsResponseMessage;
      }
      // Something went wrong please try again later message
      return Promise.reject(somethingWentWrong);
    }).catch((error) => Promise.reject(error));
};

const addUpdatePromotion = (promotionObj) => {
  const credentials = authHeader();
  promotionObj = {
    ...credentials,
    ...promotionObj
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Max-Age': 1 },
    body: { UpdatePromotionsRequestMsg: promotionObj }
  };
  return axios.post(`${config.API_URL}/ccb/updatePromotions`, requestOptions.body)
    .then((response) => {
      if (response.data && response.data.UpdatePromotionsResponseMsg) {
        if (response.data.UpdatePromotionsResponseMsg.failureMessage) {
          return Promise.reject(response.data.UpdatePromotionsResponseMsg.failureMessage.errorMessage);
        }
        return response.data.UpdatePromotionsResponseMsg;
      }
      // Something went wrong please try again later message
      return Promise.reject(somethingWentWrong);
    })
    .catch((error) => Promise.reject(error));
};

const getPromotionsList = (channelPartnerId, skus) => {
  const credentials = authHeader();
  credentials.channelPartnerID = channelPartnerId;
  credentials.dmaID = '001';
  credentials.skus = skus;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { GetPromotionsRequestMessage: credentials }
  };
  return axios.post(`${config.API_URL}/ccb/getPromotions`, requestOptions.body)
    .then((response) => {
      if (response.data && response.data.GetPromotionsResponseMessage) {
        if (response.data.GetPromotionsResponseMessage.failureMessage) {
          return Promise.reject(response.data.GetPromotionsResponseMessage.failureMessage.errorMessage);
        }
        return response.data.GetPromotionsResponseMessage;
      }
      // Something went wrong please try again later message
      return Promise.reject(somethingWentWrong);
    }).catch((error) => Promise.reject(error));
};

const UserService = {
  login,
  logout,
  addBusinessUnit,
  getBuList,
  addUpdateProducts,
  getProductsList,
  addUpdatePromotion,
  getPromotionsList
};

export default UserService;
