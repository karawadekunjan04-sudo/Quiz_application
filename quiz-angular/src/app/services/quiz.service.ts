import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BackendQuestion, QuestionWrapper, QuizResponse } from '../models/quiz.models';

// Calls the real Spring Boot backend directly — no mock fallback, since this
// API's shape (category-based quiz creation, positional scoring) is specific
// enough that a generic mock would mostly just get in the way. Run the
// backend on :8080 (proxy.conf.json forwards /question and /quiz there
// during `ng serve`).
@Injectable({ providedIn: 'root' })
export class QuizService {
  private http = inject(HttpClient);

  /** GET /question/allquestions — used only to build the category list. */
  async getAllQuestions(): Promise<BackendQuestion[]> {
    return firstValueFrom(this.http.get<BackendQuestion[]>('/question/allquestions'));
  }

  /**
   * POST /quiz/create — creates a quiz from `numQ` random questions in
   * `category` and returns its new id.
   */
  async createQuiz(category: string, numQ: number, title: string): Promise<number> {
    const params = new HttpParams()
      .set('category', category)
      .set('numQ', numQ)
      .set('title', title);
    return firstValueFrom(this.http.post<number>('/quiz/create', null, { params }));
  }

  /** GET /quiz/get/{id} — the questions for a created quiz (no answer key). */
  async getQuizQuestions(quizId: number): Promise<QuestionWrapper[]> {
    return firstValueFrom(this.http.get<QuestionWrapper[]>(`/quiz/get/${quizId}`));
  }

  /**
   * POST /quiz/submit/{id} — submits all responses at once and gets back the
   * total number correct. Responses must be in the same order the questions
   * were displayed in: the backend scores positionally, not by question id.
   */
  async submitQuiz(quizId: number, responses: QuizResponse[]): Promise<number> {
    return firstValueFrom(this.http.post<number>(`/quiz/submit/${quizId}`, responses));
  }
}
