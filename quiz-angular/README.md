# Quiz frontend (Angular)

Standalone-component Angular app wired to your actual Spring Boot backend
(`QuestionController` / `QuizController`, category-based quiz creation, single
final score). Same exam-sheet visual design as earlier drafts.

## Required backend patch

`QuizController.createQuiz` / `QuizService.createQuiz` currently return the string
`"success"` instead of the new quiz's id, so the frontend has no way to know which
quiz to fetch next. Patched versions of both files are included in
`backend-patch/` — replace your existing copies with them before running this.
The only change: `createQuiz` now returns `ResponseEntity<Integer>` (the saved
quiz's id) instead of `ResponseEntity<String>`.

## Setup

```
npm install
npm start
```

Runs `ng serve` on `http://localhost:4200`. `proxy.conf.json` forwards `/question/*`
and `/quiz/*` to `http://localhost:8080` — make sure your Spring Boot app (with the
patch above) is running there.

## Flow

1. **Setup screen** — loads `GET /question/allquestions`, derives the distinct
   `category` values for a dropdown (there's no dedicated categories endpoint).
   You pick a category, how many questions, and a title.
2. `POST /quiz/create?category=&numQ=&title=` creates the quiz and returns its id.
3. `GET /quiz/get/{id}` fetches that quiz's questions (`QuestionWrapper` — no
   answer key included).
4. **Quiz screen** — one question at a time, 30s pacing timer per question. You
   can change your answer before moving on; there's no correct/wrong reveal
   per question, since the backend doesn't expose one.
5. On the last question, all answers are submitted at once via
   `POST /quiz/submit/{id}` as a list of `{ id, response }`, where `response` is
   the exact option text (the backend does a plain string comparison against
   `rightAnswer`). **Important:** `QuizService.calculateResult` scores
   positionally (`responses.get(i)` vs `questions.get(i)`), not by matching
   `id` — so responses must stay in the same order the questions were
   displayed in. This frontend already does that; just don't reorder anything
   if you touch the backend.
6. **Results screen** — shows the total score returned by the backend. No
   per-question breakdown is shown, since the backend doesn't return one (see
   below if you want that later).

## If you later want per-question correct/wrong or a review screen

That needs backend changes — e.g. an endpoint that returns each response's
correctness alongside the total, or one that reveals `rightAnswer` per question
after submission. Happy to build both sides of that if you want it later.

## Production build

```
npm run build
```

Copy `dist/quiz-angular/browser/*` into `src/main/resources/static/` in your
Spring Boot project to serve it same-origin (no proxy needed) at
`http://localhost:8080/`.
