import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionWrapper } from './models/quiz.models';
import { QuizService } from './services/quiz.service';
import { SetupScreenComponent, QuizSetupEvent } from './components/setup-screen/setup-screen.component';
import { QuizScreenComponent, QuizFinishedEvent } from './components/quiz-screen/quiz-screen.component';
import { ResultsScreenComponent } from './components/results-screen/results-screen.component';

type Screen = 'setup' | 'quiz' | 'results';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SetupScreenComponent, QuizScreenComponent, ResultsScreenComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  screen: Screen = 'setup';

  quizId: number | null = null;
  questions: QuestionWrapper[] = [];
  score = 0;
  total = 0;

  creatingQuiz = false;
  createError = '';

  constructor(private quizService: QuizService) {}

  async onCreateQuiz(setup: QuizSetupEvent): Promise<void> {
    this.creatingQuiz = true;
    this.createError = '';
    try {
      const id = await this.quizService.createQuiz(setup.category, setup.numQ, setup.title);
      const questions = await this.quizService.getQuizQuestions(id);
      if (questions.length === 0) {
        this.createError = 'That category has no questions to build a quiz from.';
        return;
      }
      this.quizId = id;
      this.questions = questions;
      this.screen = 'quiz';
    } catch (e) {
      this.createError = "Couldn't create the quiz. Check your connection and try again.";
    } finally {
      this.creatingQuiz = false;
    }
  }

  onQuizFinished(event: QuizFinishedEvent): void {
    this.score = event.score;
    this.total = event.total;
    this.screen = 'results';
  }

  retry(): void {
    this.quizId = null;
    this.questions = [];
    this.screen = 'setup';
  }
}
