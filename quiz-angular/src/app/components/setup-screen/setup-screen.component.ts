import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';

export interface QuizSetupEvent {
  category: string;
  numQ: number;
  title: string;
}

@Component({
  selector: 'app-setup-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './setup-screen.component.html'
})
export class SetupScreenComponent implements OnInit {
  @Output() create = new EventEmitter<QuizSetupEvent>();

  categories: string[] = [];
  category = '';
  numQ = 5;
  title = 'My Quiz';

  loadingCategories = true;
  loadError = '';

  // Set by the parent while the create-quiz + fetch-questions calls are in flight.
  @Input() creating = false;
  @Input() createError = '';

  constructor(private quizService: QuizService) {}

  async ngOnInit(): Promise<void> {
    this.loadingCategories = true;
    this.loadError = '';
    try {
      const questions = await this.quizService.getAllQuestions();
      this.categories = [...new Set(questions.map((q) => q.category))].sort();
      this.category = this.categories[0] ?? '';
      if (this.categories.length === 0) {
        this.loadError = 'No questions found in the database yet — add some via POST /question/add first.';
      }
    } catch (e) {
      this.loadError = "Couldn't reach the backend. Make sure it's running on port 8080.";
    } finally {
      this.loadingCategories = false;
    }
  }

  onSubmit(): void {
    if (!this.category || this.numQ < 1) return;
    this.create.emit({ category: this.category, numQ: this.numQ, title: this.title || 'My Quiz' });
  }
}
