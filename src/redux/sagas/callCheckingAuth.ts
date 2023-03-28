import { call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";
import API from "../api";
import { logoutUser } from "src/redux/reducers/authSlice";

function* callCheckingAuth(apiCall: any, ...params: any) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (accessToken && refreshToken) {
    const response: ApiResponse<any> = yield call(
      apiCall,
      accessToken,
      ...params
    );
    if (response.status === 401) {
      //1) Проверка на то, помер ли access && refresh токены
      const accessResponse: ApiResponse<any> = yield call(
        API.verifyToken,
        accessToken
      );
      //Если accessResponse === 401 - access помер
      if (accessResponse.status === 401) {
        const refreshResponse: ApiResponse<any> = yield call(
          API.verifyToken,
          refreshToken
        );
        //Если refreshResponse === 401 - refresh помер
        if (refreshResponse.status === 401) {
          yield put(logoutUser());
        } else {
          //если refresh - жив, получаем вместе с ним новый accessToken
          const {
            ok: accessNewOk,
            data: accessNewData,
          }: ApiResponse<{ access: string }> = yield call(
            API.refreshToken,
            refreshToken
          );
          //если с новым токеном все хорошо - делаем повторно запрос на сервер и кладем его в localStorage
          if (accessNewOk && accessNewData) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessNewData.access);
            const newResponse: ApiResponse<any> = yield call(
              apiCall,
              accessNewData.access,
              ...params
            );
            return newResponse;
          } else {
            yield put(logoutUser());
          }
        }
      }
    } else {
      //Если это не ошибка токена - значит это мы что-то не так сделали с запросом
      //все хорошо
      return response;
    }
  } else {
    yield put(logoutUser());
  }
}

export default callCheckingAuth;
