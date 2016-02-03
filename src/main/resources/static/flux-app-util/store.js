'use strict';

import type {Action} from './actions';

import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Comment from './comment';
import Dispatcher from './dispatcher';

//Set up the store, If we didn't care about order we could just use MapStore
type State = {
		comments: Immutable.OrderedMap<string, Comment>,
		status: string,
}

class CommentStore extends ReduceStore<string, Comment> {

	getInitialState(): State {
		return {
			comments: Immutable.OrderedMap(),
			status: ''
		}
	}

	reduce(state: State, action: Action): State {
		switch (action.type) {
		
			case 'comment/comments-loading':
				let newState = $.extend({}, state);
				newState.status = 'loading';
				return newState;
				
			case 'comment/comments-loaded':
				return getCommentsFromServer(state, action.data);
			
			case 'comment/create':
				return createComment(state, action.author, action.text);
	
//			case 'comment/destroy':
//				return state.delete(action.id);
//	
//			case 'comment/update-text':
//				return state.setIn([action.id, 'text'], action.text.trim());
	
			default:
				return state;
		}
	}

}

function getCommentsFromServer(state: State, data: any[]): State {
	
	let newState = $.extend({}, state);
	
	data.map(c => {
		let newComment = new Comment(c.author, c.text);
		newState.comments = newState.comments.set(newComment.id, newComment);
	});

	newState.status = 'ok';
	
	return newState;
}

//Pure helper function to create a new Comment and add it to the state.
function createComment(state: State, author: ?string, text: ?string): State {
	
	let newState = $.extend({}, state);
	
	if (!author || !text) {
		return newState;
	}

	newState.status = 'ok';
	var newComment = new Comment(author, text);
	newState.comments = newState.comments.set(newComment.id, newComment);
	
	return newState;
}

//Export a singleton instance of the store, could do this some other way if
//you want to avoid singletons.
const instance = new CommentStore(Dispatcher);
export default instance;