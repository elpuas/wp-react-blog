import React        from 'react';
import {render}     from 'react-dom';
import App          from './components/App.js';
import Home         from './components/Home.js';
import Account      from './components/Account.js';
import Page         from './components/Page.js';
import Bloglist     from './components/bloglist.js';
import Post         from './components/Post.js';
import Login         from './components/Login/Login.js';
import views        from './components/views.js';

import {
  browserHistory,
  IndexRoute,
  Redirect,
  Route,
  Router
} from 'react-router';

import DataActions  from './actions/DataActions.js';


class AppInitializer {

    buildRoutes(data) {
        return data.pages.map((page, i) => {
            console.log(page.slug)
            const component = views[page.slug];
            return (
                <Route
                    getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                            cb(null, require(component).default);
                        });
                    }}
                    key={ page.id }
                    path={`/${page.slug}`}
                />                  
            );
        });
    }

    run() {
        DataActions.getPages((response)=>{
            render(
                <Router history={browserHistory}>
                    <Route path="/" component={ App } >
                        <IndexRoute component={ Home } />
                         <Route path='/profile' name='profile' component={Account} />
                         <Route path='/blogs' name='blogs' component={Bloglist} />
                         <Route path='/blogs/:post' name='blog' component={Post} />
                          <Route path='/login' name='login' component={Login} />
                         <Route path='/:page' name='page' component={Page} />

                        {this.buildRoutes(response)}
                    </Route>
                    <Redirect from="*" to="/" />
                </Router>

                , document.getElementById('app')
            );
        });
    }
}

new AppInitializer().run();