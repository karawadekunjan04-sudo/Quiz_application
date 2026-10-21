package com.example.demo.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.QuestionService;

import com.example.demo.Entity.Question;

@RestController
@RequestMapping("question")
public class QuestionController {

    @Autowired
    QuestionService quizService;

    @GetMapping("allquestions")
    public List<Question> getallquestions() {
        return quizService.getallquestions();
    }
    
    @GetMapping("category/{category}")
    public List<Question> getQuestionByCategory(@PathVariable String category){
    	return quizService.getQuestionByCategory(category);
    }
    
    @PostMapping("add")
    public String addQuestion(@RequestBody Question question) {
    	return quizService.addQuestion(question);
    	
    }
}
