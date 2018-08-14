import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {helper} from 'src/plugins/helper'

export default {

  index(filter, take, page, fields, include) {
    filter = JSON.stringify(filter);
    let key = JSON.stringify(filter + take + page + fields + include);
    return new Promise((resolve, reject) => {
      helper.rememberAsync("users:" + key, 3600 * 3, () => {
        return http.get(config('api.api_url') + '/usersapi', {
          params: {
            filter: filter,
            take: take,
            page: page,
            fields: fields,
            include: include
          }
        })
      }).then(response => {
        resolve(response);
      })
        .catch(error => {
          reject(error);
        });
    });
  },

  show(id) {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_url') + '/usersapi/' + id)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //Get and save in storage user rep
  userRep() {
    let parameters = {}
    //Order parameters for URL request
    parameters.filter = {roles: [6]}

    return new Promise((resolve, reject) => {
      helper.rememberAsync('usersRep', 3600 * 3, () => {
        return http.get(config('api.api_url') + '/users', {params: parameters})
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject([])
      });
    })
  },

  update(data, id) {
    return new Promise((resolve, reject) => {
      http.put(config('api.api_url') + '/usersapi/' + id, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      http.post(config('api.api_url') + '/usersapi', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  roles(filter, take, page, fields, include) {
    filter = JSON.stringify(filter);
    let key = JSON.stringify(filter + take + page + fields + include);
    return new Promise((resolve, reject) => {
      helper.rememberAsync("roles:" + key, 3600 * 3, () => {
        return http.get(config('api.api_url') + '/rolesapi', {
          params: {
            filter: filter,
            take: take,
            page: page,
            fields: fields,
            include: include
          }
        })
      }).then(response => {
        resolve(response);
      })
        .catch(error => {
          reject(error);
        });
    });
  }


}
