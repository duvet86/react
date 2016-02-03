package com.react.model;

public class Comment {

	private long id;
	private String author;
	private String text;
	
	public Comment() {
	}
	
	public Comment(long id, String author, String text) {
		this.id = id;
		this.author = author;
		this.text = text;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
}
