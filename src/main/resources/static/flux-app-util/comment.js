'use strict';

import Immutable from 'immutable';

const CommentRecord = Immutable.Record({
	id: undefined,
	author: undefined,
	text: undefined,
});

export default class Comment extends CommentRecord {
	id: string;
	author: string;
	text: string;

	constructor(author: string, text: string) {
		super({
			id: Date.now() + Math.round(Math.random() * 1000),
			author,
			text,
		});
	}
}