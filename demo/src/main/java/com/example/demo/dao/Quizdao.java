package com.example.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Quiz;

public interface Quizdao extends JpaRepository <Quiz,Integer>{

}
