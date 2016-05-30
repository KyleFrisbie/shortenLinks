import React from 'react';
import ReactDOM from 'react-dom';

import {Links} from '../imports/collections/links';
import Header from './components/header';
import LinkCreate from './components/link_create';

const App = () => {
	return (
		<div>
			<Header />
			<LinkCreate />
		</div>
	);
};


Meteor.startup(() => {
	ReactDOM.render(<App />, document.querySelector('.render-target'));
});