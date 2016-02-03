package com.react.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.react.model.Comment;

@RestController
public class CommentCtrl {
	
    private final AtomicLong counter = new AtomicLong();
    List<Comment> commentList = new ArrayList<Comment>();
    
    @RequestMapping(value = "/Comment", method = RequestMethod.GET)
    public List<Comment> listComments() {
    	
    	commentList.add(new Comment(counter.incrementAndGet(),
                					"Luca",
                					"text"));
    	
        return commentList;
    }
    
    @RequestMapping(value = "/Comment",  method = RequestMethod.POST)
    public List<Comment> saveComment(@RequestBody Comment comment) {

    	comment.setId(counter.incrementAndGet());
    	commentList.add(comment);
    	
        return commentList;
    }

}
