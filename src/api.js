import axios from 'axios';
import {ACTIVITY, JOKE, MEMES} from './constants/api';

export async function getActivity() {
  return axios
    .get(ACTIVITY)
    .then(response => {
      const status = response.status;
      const data = response.data;
      return {status, data: data};
    })
    .catch(error => {
      try {
        const status = error.response.status;
        const eData =
          error.response.data.errors[0].msg ||
          error.response.data.errors[0].message;
        return {status, data: eData};
      } catch (err) {
        const status = 404;
        const eData = 'Something Went wrong !';
        return {status, data: eData};
      }
    });
}

export async function getJoke() {
  return axios
    .get(JOKE)
    .then(response => {
      const status = response.status;
      const data = response.data;
      return {status, data: data};
    })
    .catch(error => {
      try {
        const status = error.response.status;
        const eData =
          error.response.data.errors[0].msg ||
          error.response.data.errors[0].message;
        return {status, data: eData};
      } catch (err) {
        const status = 404;
        const eData = 'Something Went wrong !';
        return {status, data: eData};
      }
    });
}

export async function getMemes() {
  return axios
    .get(MEMES)
    .then(response => {
      const status = response.status;
      const data = response.data;
      return {status, data: data};
    })
    .catch(error => {
      try {
        const status = error.response.status;
        const eData =
          error.response.data.errors[0].msg ||
          error.response.data.errors[0].message;
        return {status, data: eData};
      } catch (err) {
        const status = 404;
        const eData = 'Something Went wrong !';
        return {status, data: eData};
      }
    });
}
