'use strict'

import React from 'react'
import { render } from 'react-dom'
import Hello from './hello'
import MarkdownEditor from './simple-input'
import CommentBox from './comment'

let helloElement = document.getElementById('content');
let simpleInputElement = document.getElementById('simple_input');
let commentElement = document.getElementById('comment');

render(<Hello />, helloElement)
render(<MarkdownEditor />, simpleInputElement)
render(<CommentBox />, commentElement);