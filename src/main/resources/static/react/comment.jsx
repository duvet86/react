'use strict'

import React, { Component } from 'react'

import type Immutable from 'immutable';
import type {Store} from 'flux/utils';
import type Comment from '../flux-app-util/comment';
import {Container} from 'flux/utils';
import CommentStore from '../flux-app-util/store';
import {dispatch} from '../flux-app-util/dispatcher';

type State = {
		comments: Immutable.Map<string, Comment>,
		author: string,
		text: string,
		status: string,
};


type Props = {
		comments: Immutable.Map<string, Comment>,
		comment: Comment,
		onCommentSubmit: (author: string, text: string) => void,
		status: string,
};

class CommentBox extends Component<{}, {}, State> {

	static getStores(): Array<Store> {
		return [CommentStore];
	}

	static calculateState(prevState: ?State): State {
		let currentState = CommentStore.getState();
		return {
			comments: currentState.comments,
			status: currentState.status
		};
	}
	
	componentDidMount(): void {
		
		dispatch({
			type: 'comment/comments-loading',
		});
		
		$.getJSON('/comment')
		.done((data) => {
			
			dispatch({
				type: 'comment/comments-loaded',
				data
			});
			
		});
	}

	handleCommentSubmit(comment: comment): void {
		if (comment.author.trim() != '' && comment.text.trim() != '') {
			dispatch({
				type: 'comment/create',
				author: comment.author.trim(),
				text: comment.text.trim()
			});
		}
	}

	render(): ?ReactElement {
		
		return (
				<div className="commentBox">
				<h1>Comments</h1>
				<CommentList comments={this.state.comments} status={this.state.status} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit} />
				</div>
		);
	}
}

class CommentList extends Component<{}, Props, {}> {
	render(): ?ReactElement {

		const {comments, status} = this.props;

//		if (comments.size === 0) {
//			return null;
//		}
		
		if (status == 'loading') {
			return(<span>Loading Content</span>);
		}

		const commentItems = [];
		for (let [id, comment] of comments) {
			commentItems.push(
					<CommentElem key={id} comment={comment} />
			);
		}

		return (
				<div className="commentList">
				{commentItems}
				</div>
		);
	}
}

class CommentForm extends Component {
	
	state = {
			author: '',
			text: '',
	};

	handleAuthorChange = (event) => {
		this.setState({author: event.target.value});
	};

	handleTextChange = (event) => {
		this.setState({text: event.target.value});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if (!text || !author) {
			return;
		}
		// send request to the server
		this.props.onCommentSubmit({author: author, text: text});
		// clean fields
		this.setState({author: '', text: ''});
	};

	render() {
		let author = this.state.author;
		let text = this.state.text;
		return (
				<div className="commentForm">
					<form className="commentForm" onSubmit={this.handleSubmit}>
						<input value={author} onChange={this.handleAuthorChange} type="text" placeholder="Your name" />
						<input value={text} onChange={this.handleTextChange} type="text" placeholder="Say something..." />
						<input type="submit" value="Post" />
					</form>
				</div>
		);
	}
}

class CommentElem extends Component<{}, Props, {}> {
	
	render(): ?ReactElement {
		
		const {comment} = this.props;
		
		return (
				<div className="comment">
				<h3 className="commentAuthor">
				{comment.author}
				</h3>
				{comment.text}
				</div>
		);
	}
}

const CommentAppContainer = Container.create(CommentBox);
export default CommentAppContainer;