import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionWrapper, QuizResponse } from '../../models/quiz.models';
import { QuizService } from '../../services/quiz.service';
import { LETTERS, RING_CIRCUMFERENCE, TIME_PER_QUESTION } from '../../constants';

export interface QuizFinishedEvent {
  score: number;
  total: number;
}

@Component({
  selector: 'app-quiz-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-screen.component.html'
})
export class QuizScreenComponent implements OnInit, OnDestroy {
  @Input({ required: true }) quizId!: number;
  @Input({ required: true }) questions: QuestionWrapper[] = [];
  @Output() finished = new EventEmitter<QuizFinishedEvent>();

  readonly letters = LETTERS;
  readonly timePerQuestion = TIME_PER_QUESTION;

  currentIndex = 0;
  selectedIndex = -1;
  timeLeft = TIME_PER_QUESTION;
  submitting = false;
  submitErrorMessage = '';

  private responses: QuizResponse[] = [];
  private timerHandle: ReturnType<typeof setInterval> | null = null;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.startQuestion();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  get currentQuestion(): QuestionWrapper {
    return this.questions[this.currentIndex];
  }

  get currentOptions(): string[] {
    const q = this.currentQuestion;
    return [q.option1, q.option2, q.option3, q.option4];
  }

  get isLastQuestion(): boolean {
    return this.currentIndex === this.questions.length - 1;
  }

  get displayTimeLeft(): number {
    return Math.max(this.timeLeft, 0);
  }

  get ringOffset(): number {
    const fraction = Math.max(this.timeLeft, 0) / this.timePerQuestion;
    return RING_CIRCUMFERENCE * (1 - fraction);
  }

  get ringColor(): string {
    return this.timeLeft <= 5 ? 'var(--bad)' : 'var(--ink)';
  }

  tallyClass(index: number): string {
    if (index === this.currentIndex) return 'current';
    if (index < this.currentIndex) return 'done';
    return '';
  }

  optionClass(index: number): string {
    return index === this.selectedIndex ? 'selected' : '';
  }

  selectOption(index: number): void {
    this.selectedIndex = index;
  }

  private startQuestion(): void {
    this.selectedIndex = -1;
    this.startTimer();
  }

  private startTimer(): void {
    this.clearTimer();
    this.timeLeft = this.timePerQuestion;
    this.timerHandle = setInterval(() => {
      this.timeLeft -= 1;
      if (this.timeLeft <= 0) {
        this.clearTimer();
        this.advance();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timerHandle !== null) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
  }

  async next(): Promise<void> {
    this.clearTimer();
    await this.advance();
  }

  private async advance(): Promise<void> {
    const q = this.currentQuestion;
    const options = this.currentOptions;
    const answerText = this.selectedIndex >= 0 ? options[this.selectedIndex] : '';

    this.responses.push({ id: q.id, response: answerText });

    this.currentIndex += 1;
    if (this.currentIndex >= this.questions.length) {
      await this.submit();
    } else {
      this.startQuestion();
    }
  }

  private async submit(): Promise<void> {
    this.submitting = true;
    this.submitErrorMessage = '';
    try {
      const score = await this.quizService.submitQuiz(this.quizId, this.responses);
      this.finished.emit({ score, total: this.questions.length });
    } catch (e) {
      this.submitErrorMessage = "Couldn't submit your answers. Check your connection and try again.";
      // Un-consume the last question so "Submit quiz" is clickable again.
      this.currentIndex -= 1;
      this.responses.pop();
    } finally {
      this.submitting = false;
    }
  }
}
