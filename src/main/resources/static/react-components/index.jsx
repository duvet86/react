'use strict'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App.component'
import Home from './Home.component'
import About from './About.component'
import Repos from './Repos.component'
import Repo from './Repo.component'

let rootElement = document.getElementById('content');

render((
		<Router history={browserHistory}>
			<Route path="/" component={App} >
				<IndexRoute component={Home}/>
				<Route path="/repos" component={Repos} >
					<Route path="/repos/:userName/:repoName" component={Repo} />
				</Route>
				<Route path="/about" component={About} />
			</Route>
		</Router>
), rootElement)