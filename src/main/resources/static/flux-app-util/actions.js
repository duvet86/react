'use strict';

export type Action =
{
	type: 'comment/comments-loading',
} |
{
	type: 'comment/comments-loaded',
	data: any[]
} |
{
	type: 'comment/create',
	author: string,
	text: string,
} |
{
	type: 'comment/destroy',
	id: string,
} |
{
	type: 'comment/update-text',
	id: string,
	author: string,
	text: string,
};