import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from '../components/App';
// import BookEditor from '../components/BookEditor/BookEditor';

function handleSubmit(values){
  console.log(values)
}

export default (
  <Route path='/' component={App} >
    <IndexRoute component={()=>{return <App /> }} />
    {/* <Route path='/app' component={AppForm} /> */}

    <Redirect from='*' to='/' />
  </Route>
);
