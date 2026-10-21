package com.example.demo.Service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.QuestionDAO;
import com.example.demo.Entity.Question;

@Service
public class QuestionService {

    @Autowired
    QuestionDAO quizdao;

    public List<Question> getallquestions() {
        return quizdao.findAll();
    }

	public List<Question> getQuestionByCategory(String category) {
		// TODO Auto-generated method stub
		return quizdao.findBycategory(category);
	}

	public String addQuestion(Question question) {
		quizdao.save(question);
		return "sucess";
	}
}