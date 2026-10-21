package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Question;
import com.example.demo.Entity.QuestionWrapper;
import com.example.demo.Entity.Quiz;
import com.example.demo.Entity.Response;
import com.example.demo.dao.QuestionDAO;
import com.example.demo.dao.Quizdao;

@Service
public class QuizService {
	
	@Autowired
	Quizdao quizdao;
	@Autowired
	QuestionDAO questionDao;

	public ResponseEntity<Integer> createQuiz(String category, int numQ, String title) {

		List<Question>questions=questionDao.findRandomQuestionsByCategory(category,numQ);

		Quiz quiz=new Quiz();
		quiz.setTitle(title);
		quiz.setQuestions(questions);
		Quiz savedQuiz = quizdao.save(quiz);

		// CHANGED: return the generated id instead of the string "success",
		// so the frontend knows which quiz to fetch via GET /quiz/get/{id}.
		return new ResponseEntity<>(savedQuiz.getId(), HttpStatus.CREATED);

	}

	public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
		
		Optional <Quiz> quiz=quizdao.findById(id);
		List<Question>questionFromDB=quiz.get().getQuestions();
		List<QuestionWrapper>questionForUser=new ArrayList<>();
		for(Question q:questionFromDB) {
			QuestionWrapper qw=new QuestionWrapper(q.getId(),q.getQuestionTitle(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
			questionForUser.add(qw);
		}
		
		return new ResponseEntity<>(questionForUser,HttpStatus.OK);
	}

	public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
		Quiz quiz=quizdao.findById(id).get();
		List<Question>questions=quiz.getQuestions();
		
		int right=0;
		int i=0;
		for(Response response:responses) {
			// Defensive null check: a skipped/timed-out question could arrive
			// with a null or blank response instead of matching text.
			String answer = response.getResponse();
			if(answer != null && answer.equals(questions.get(i).getRightAnswer()))
				
				right++;
			i++;
			
		}
		return new ResponseEntity<>(right,HttpStatus.OK);
		
	}

}
