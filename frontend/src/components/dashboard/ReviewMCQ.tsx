import { useEffect, useState } from "react";
import { DashboardView } from "../../types";

interface Props {
  onViewChange: (view: DashboardView) => void;
}

export function ReviewMCQ({ onViewChange }: Props) {
  const [review, setReview] = useState<any>(null);

  const [current, setCurrent] = useState(0);

  const [selected, setSelected] = useState("");

  const [showAnswer, setShowAnswer] = useState(false);

  const [score, setScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("review_session");

    if (saved) {
      setReview(JSON.parse(saved));
    }
  }, []);

  if (!review) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  const mcq = review.mcqs[current];

  const finishReview = () => {

    const previous = JSON.parse(
        localStorage.getItem("learning_progress") || "{}"
    );

    const completed =
        (previous.casesCompleted || 0) + 1;

    const report = JSON.parse(
        localStorage.getItem("examiner_report")!
    );

    const progress = {

        casesCompleted: completed,

        averageScore: report.overall_score,

        reasoning: report.reasoning_assessment.score,

        history: report.history_assessment.score,

    };

    localStorage.setItem(
        "learning_progress",
        JSON.stringify(progress)
    );

    onViewChange("home");

};

return (
    <div className="max-w-4xl mx-auto p-8">


      <h1 className="text-3xl font-bold mb-2">
        {review.session_title}
      </h1>

      <p className="text-gray-500 mb-8">
        {review.why_this_session}
      </p>

      <div className="bg-white rounded-2xl shadow p-8">

        <div className="text-sm text-gray-500 mb-6">
          Question {current + 1} of {review.mcqs.length}
        </div>

        <h2 className="text-xl font-semibold mb-6">
          {mcq.question}
        </h2>

        <div className="space-y-3">

          {mcq.options.map((option: string) => {

            const isCorrect =
              option === mcq.correct_answer;

            const isSelected =
              option === selected;

            return (

              <button
                key={option}
                disabled={showAnswer}
                onClick={() => {

                  setSelected(option);

                  if (isCorrect) {
                    setScore((s) => s + 1);
                  }

                  setShowAnswer(true);

                }}
                className={`

                  w-full
                  text-left
                  p-4
                  rounded-xl
                  border
                  transition

                  ${
                    showAnswer && isCorrect
                      ? "border-green-600 bg-green-50"
                      : ""
                  }

                  ${
                    showAnswer &&
                    isSelected &&
                    !isCorrect
                      ? "border-red-500 bg-red-50"
                      : ""
                  }

                  ${
                    !showAnswer
                      ? "border-gray-200 hover:border-blue-400"
                      : ""
                  }

                `}
              >
                {option}
              </button>

            );

          })}

        </div>

        {showAnswer && (

          <div className="mt-8 rounded-xl bg-gray-50 p-5">

            <p className="font-semibold">

              Correct Answer:

              {" "}

              {mcq.correct_answer}

            </p>

            <p className="mt-4">

              {mcq.explanation}

            </p>

            <p className="mt-4 text-sm text-blue-600">

              Targeted weakness:

              {" "}

              {mcq.weakness_targeted}

            </p>

          </div>

        )}

        {showAnswer && current < review.mcqs.length - 1 && (

          <button

            className="mt-8 px-6 py-3 rounded-xl bg-primary text-white"

            onClick={() => {

              setSelected("");

              setShowAnswer(false);

              setCurrent(current + 1);

            }}

          >

            Next Question

          </button>

        )}

        {showAnswer && current === review.mcqs.length - 1 && (

          <div className="mt-8 space-y-5">

            <div className="rounded-xl bg-blue-50 p-5">

              <h3 className="text-xl font-bold">

                Review Complete 🎉

              </h3>

              <p className="mt-3">

                You answered

                {" "}

                <strong>

                  {score}

                </strong>

                {" "}

                out of

                {" "}

                <strong>

                  {review.mcqs.length}

                </strong>

                {" "}

                correctly.

              </p>

              <p className="mt-2">

                Final Score:

                {" "}

                <strong>

                  {Math.round(
                    (score / review.mcqs.length) * 100
                  )}

                  %

                </strong>

              </p>

            </div>

            <button

              onClick={finishReview}

              className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold"

            >

              Return to Dashboard

            </button>

          </div>

        )}

      </div>

    </div>

  )

}