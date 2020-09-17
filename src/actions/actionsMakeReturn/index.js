import {axiosInstance as axios} from "../../utils/utils";
import {makeUrl} from "../../utils/utils";
import {
    MAKE_RETURN_RESET,
    MAKE_RETURN_SUCCESS,
    MAKE_RETURN_FAIL,
    MAKE_RETURN_TIMEOUT
} from "./actionsMakeReturn";

//Процесс возврата
const notifyReturnOrderReset = () => ({type: MAKE_RETURN_RESET});
const notifyReturnOrderSuccess = (status, info) => ({type: MAKE_RETURN_SUCCESS});
const notifyReturnOrderError = () => ({type: MAKE_RETURN_FAIL});
const notifyReturnOrderTimeout = () => ({type: MAKE_RETURN_TIMEOUT});

const returnProc = (id, continue_=false) => {
    return dispatch => {
        dispatch(notifyReturnOrderReset());
        axios
            .put(makeUrl(`/cart/0/fuelrefundbyreceiptidentifier?receiptIdentifier=${id}&continue=${continue_}`), {})
            .then(res => {
                console.log('***** MakeReturn result: ', res.status, res.data);
                dispatch(notifyReturnOrderSuccess());
            })
            .catch(error => {
                 console.log('***** MakeReturn catch: >>> ', error.message);
               if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    if (error.response.status === 400) { // temporary for continue
                        //let info = error.response.data;
                        dispatch(notifyReturnOrderError());
                    }
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);

                    dispatch(notifyReturnOrderTimeout());
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
                //console.log(error);
                //dispatch(notifyReturnOrderError(err.response.status));
            })
    }
}

//Данный Thunk - Запускает процесс возврата
export const makeReturn = (id, continue_) => {
    return returnProc(id, continue_);
}

export default {
    makeReturn
}