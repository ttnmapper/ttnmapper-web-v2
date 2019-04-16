import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import { Route, Redirect } from 'react-router-dom';
import { parseQuery } from '../Home/query-utils'
import qs from 'query-string';

/*
This class extends the old special.php format to the new format. It rewrites 
some url parameters

*/

class RedirectOldSpecial extends Component {
  render() {
    const { exact, from, to } = this.props;
    const params = parseQuery(this.props.location.search)

    /* Replace:
    node: device_id
    mode: packets
    date: from_date & to_date
    gateways: on
    */
    const newParams = Object.assign({}, params)
    if ('node' in params) {
        newParams['deviceID'] = params.node
        newParams['mode'] = 'packets'
        delete newParams.node
    }

    console.log(params)
    console.log(newParams)
    return (
      <Redirect
        exact={exact}
        from={from}
        to={to + "?" +qs.stringify(newParams)}
      />);
  }

};

export default RedirectOldSpecial;