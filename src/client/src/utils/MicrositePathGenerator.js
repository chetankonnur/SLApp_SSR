import { REACT_APP_SAZEN_WEB_APP_PATH } from './NetworkConstants';

const NGOS = 'ngos';

export const generateMicrositeNavigationPath = (ngoId) => {
    const micrositeURL = `${REACT_APP_SAZEN_WEB_APP_PATH}/${NGOS}/${ngoId}/microsites?ngoId=${ngoId}`;
    return micrositeURL;
}