// Matches com.example.demo.Entity.Question — used only to derive the list
// of distinct categories from GET /question/allquestions.
export interface BackendQuestion {
  id: number;
  questionTitle: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  rightAnswer: string;
  difficultyLevel: string;
  category: string;
}

// Matches com.example.demo.Entity.QuestionWrapper — what GET /quiz/get/{id}
// actually returns. Note: no rightAnswer field, it's never sent to the client.
export interface QuestionWrapper {
  id: number;
  questionTitle: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

// Matches com.example.demo.Entity.Response — body items for POST /quiz/submit/{id}.
// `response` must be the exact option text (not an index or letter), since the
// backend compares it with String.equals() against the stored rightAnswer.
export interface QuizResponse {
  id: number;
  response: string;
}
