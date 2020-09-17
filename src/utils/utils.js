import axios from "axios";
import {urlApi} from './globalConst';

/*-- Здесь описана логика рефреша токена для работы приложения (не для токена Авторизации пользователя), а также подставление токена приложения в заголовки запросов к Api --*/

function controllerUniqueId(tokenAccess) {
    let tokenParts = tokenAccess.split(".");
    let payload = JSON.parse(atob(tokenParts[1]));
    return payload.ControllerId
}

//Функция которая вытягивает из токена параметр exp (время протухания токена) и возвращает true/false
function getDataToken(tokenAccess) {
    let tokenParts = tokenAccess.split(".");
    let payload = JSON.parse(atob(tokenParts[1])); //Время когда протухнет токен
    return Date.now() >= payload.exp * 1000
}

//Создание инстанса axios - который потом надо импортиовать вместо где делаем запрос к api
export const axiosInstance = axios.create({});

export function clearToken() {
    localStorage.setItem('loginToken', null)
}

export function makeUrl(url) {
    return `${urlApi}/api-v01` + url;
}

//Функция которая отработает при вызвое инстонса и сработает первая перед всеми последующими запросами к api
const requestHandler = async (request) => {
    let accessToken = JSON.parse(localStorage.getItem('loginToken'));
    //Если токена нет тггда получим и запишем localStorage
    if (!accessToken) {
        let accessTokenResponse = await axios
            .post(`${urlApi}/api-v01/auth/login`,{
                "login": "",
                "password": "",
                "controllerUniqueId": "string"
            })
        accessToken = accessTokenResponse.data
        localStorage.setItem('loginToken', JSON.stringify(accessToken));
    }
    //Если токен протух вызовим метод рефреша токена
    if (getDataToken(accessToken.accessToken)) {
        let responseRefreshToken = await axios
            .post(`${urlApi}/api-v01/auth/renewtokens`, {
                "userUniqId": accessToken.userUniqId,
                "controllerUniqueId": controllerUniqueId(accessToken.accessToken),
                "refreshToken": accessToken.refreshToken
            })
        accessToken = responseRefreshToken.data
        localStorage.setItem('loginToken', JSON.stringify(accessToken))
    }
    //Данный код создает заголовок который указывает токен (необходимо для запросов к api)
    request.headers['Authorization'] = "Bearer " + accessToken.accessToken
    return request
}

//Здесь импортируем функцию в инстанс axios
axiosInstance.interceptors.request.use(
    async (request) => await requestHandler(request)
)




