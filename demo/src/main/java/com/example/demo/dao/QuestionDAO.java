package com.example.demo.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Question;

@Repository
public interface QuestionDAO extends JpaRepository <Question,Integer>{
	
	List<Question>findBycategory(String category);
    
	
	
	//@Query(value="SELECT * FROM question q Where q.category=:category ORDER BY RANDOM() LIMIT:numQ",nativeQuery=true)
	//List<Question> findRandomQuestionsByCategory(String category, int numQ);

	
	@Query(value = "SELECT * FROM question q WHERE q.category = :category ORDER BY RAND() LIMIT :numQ", nativeQuery = true)
	List<Question> findRandomQuestionsByCategory(
	        @Param("category") String category,
	        @Param("numQ") int numQ
	);
}
