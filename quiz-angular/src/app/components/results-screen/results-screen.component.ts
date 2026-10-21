import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-screen.component.html'
})
export class ResultsScreenComponent {
  @Input({ required: true }) score = 0;
  @Input({ required: true }) total = 0;

  @Output() retry = new EventEmitter<void>();

  get resultLine(): string {
    if (this.total === 0) return '—';
    const pct = Math.round((this.score / this.total) * 100);
    if (pct === 100) return 'Perfect score.';
    if (pct >= 70) return 'Solid result.';
    if (pct >= 40) return 'Room to improve.';
    return 'Worth another attempt.';
  }

  onRetry(): void {
    this.retry.emit();
  }
}
