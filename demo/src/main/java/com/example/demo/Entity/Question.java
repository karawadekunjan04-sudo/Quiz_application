
package com.example.demo.Entity;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@JsonPropertyOrder({
    "id",
    "questionTitle",
    "option1",
    "option2",
    "option3",
    "option4",
    "rightAnswer",
    "difficultyLevel",
    "category"
})

@Data
@Entity
public class Question {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;
	private String questionTitle;
	private String option1;
	private String option2;
	private String option3;
	private String option4;
	private String rightAnswer;
	private String difficultyLevel;
	private String category;
	
}
