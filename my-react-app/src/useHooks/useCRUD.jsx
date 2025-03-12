import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showSnackbar } from '../lib/util';
import {
  requestRead, requestCreate, requestUpdate, setReadData,
  clearData, requestDelete, clearReadData, setReadLoading,
} from '../store/actions/crud';
import api from '../api';

const selector = (state, id, type) => {
  if (!id) {
    return null;
  }
  const newType = type === 'synRead' ? 'read' : type;
  return state.crud.get(id) && state.crud.get(id).get(newType);
};

export default function useCRUD({
  id, url, type, shouldClearError = true,
}) {
  const dispatch = useDispatch();
  const response = useSelector((state) => selector(state, id, type));
  const { message } = response?.get('error') || {};
  const op = {};

  /* Function to make read request to server for type READ */
  op.read = useCallback((params = {}, extraURL = '') => {
    dispatch(requestRead(id, `${url}${extraURL}`, params));
  }, [id, url, dispatch]);

  /* Function to make read request to server for type CREATE */
  op.create = useCallback((params = {}, extraURL = '', cacheResponse = false) => {
    dispatch(requestCreate(id, `${url}${extraURL}`, params, cacheResponse));
  }, [id, url, dispatch]);

  /* Function to make read request to server for type UPDATE */
  op.update = useCallback((params = {}, extraURL = '', cacheResponse = false) => {
    dispatch(requestUpdate(id, `${url}${extraURL}`, params, cacheResponse));
  }, [id, url, dispatch]);

  /* Function to make read request to server for type DELETE */
  op.delete = useCallback((params = {}, extraURL = '') => {
    dispatch(requestDelete(id, `${url}${extraURL}`, params));
  }, [id, url, dispatch]);

  /* Function to make sync read request to server for type READ */
  op.synRead = useCallback(async (params = {}, extraURL = '') => {
    try {
      dispatch(setReadLoading(id, true));
      const readResponse = await api.get({
        url: `${url}${extraURL}`,
        params,
      });
      dispatch(setReadData(id, readResponse));
      return readResponse;
    } catch (readError) {
      dispatch(setReadLoading(id, false));
      const errorMessage = readError?.data?.error?.message
      || readError?.data?.errorMessage || readError?.message;
      if (errorMessage) {
        if (errorMessage === 'Network Error') {
          return 'Network Error';
        }
        showSnackbar(errorMessage);
      }
    }
    return null;
  }, [dispatch, id, url]);

  const clear = useCallback((read) => {
    dispatch(clearData(id));
    if (read) dispatch(clearReadData(id));
  }, [dispatch, id]);

  useEffect(() => {
    const errorMessage = response?.get('error')?.response?.data?.error?.message || response?.get('error')?.response?.data?.errorMessage || response?.get('data')?.data?.errorMessage || message;
    if (shouldClearError && (errorMessage)) {
      showSnackbar(errorMessage);
      clear(type === 'read');
    }
  }, [message, response]);

  return [response?.get('data')?.data, !!response?.get('loading'), op[type], clear, (response?.get('error')?.response?.data || response?.get('error')), response?.get('data')?.headers];
}
