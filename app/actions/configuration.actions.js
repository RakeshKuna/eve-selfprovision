import { appConstants } from '../constants';


function pageDefault(size) {
  return { type: appConstants.PAGE_SIZE, size };
}
const configurationActions = {
  pageDefault
};
export default configurationActions;
