import { useState } from "react";

const countries = [
  { name: "Deutschland", flag: "🇩🇪" },
  { name: "Frankreich", flag: "🇫🇷" },
  { name: "Türkei", flag: "🇹🇷" },
  { name: "Syrien", flag: "🇸🇾" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Brasilien", flag: "🇧🇷" },
  { name: "Kanada", flag: "🇨🇦" },
  { name: "Ägypten", flag: "🇪🇬" },
  { name: "Italien", flag: "🇮🇹" },
  { name: "Spanien", flag: "🇪🇸" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Indien", flag: "🇮🇳" },
  { name: "China", flag: "🇨🇳" },
  { name: "Australien", flag: "🇦🇺" },
  { name: "Mexiko", flag: "🇲🇽" },
  { name: "Norwegen", flag: "🇳🇴" },
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function CountryQuiz() {
  const [question, setQuestion] = useState(() =>
    createQuestion(countries)
  );

  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);

  function createQuestion(list) {
    const correct =
      list[Math.floor(Math.random() * list.length)];

    const wrong = shuffle(
      list.filter((country) => country.name !== correct.name)
    ).slice(0, 3);

    return {
      correct,
      answers: shuffle([correct, ...wrong]),
    };
  }

  function answer(country) {
    if (answered) return;

    setSelected(country);
    setAnswered(true);

    if (country.name === question.correct.name) {
      setScore((oldScore) => oldScore + 1);
    }
  }

  function nextQuestion() {
    setQuestion(createQuestion(countries));
    setAnswered(false);
    setSelected(null);
    setQuestionNumber((number) => number + 1);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.game}>
        <div style={styles.header}>
          <div>
            <div style={styles.smallTitle}>🌍 MINIGAME</div>
            <h1 style={styles.title}>Länder-Raten</h1>
          </div>

          <div style={styles.score}>
            🏆 {score}
          </div>
        </div>

        <div style={styles.questionInfo}>
          Frage {questionNumber}
        </div>

        <div style={styles.flag}>
          {question.correct.flag}
        </div>

        <h2 style={styles.question}>
          Welches Land ist das?
        </h2>

        <div style={styles.answers}>
          {question.answers.map((country) => {
            let background = "#f5f5f5";

            if (answered) {
              if (country.name === question.correct.name) {
                background = "#b7f7c1";
              } else if (
                country.name === selected?.name
              ) {
                background = "#ffb8b8";
              }
            }

            return (
              <button
                key={country.name}
                onClick={() => answer(country)}
                style={{
                  ...styles.answer,
                  background,
                }}
              >
                {country.name}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={styles.result}>
            {selected.name === question.correct.name ? (
              <div style={styles.correct}>
                ✅ Richtig! +1 Punkt
              </div>
            ) : (
              <div style={styles.wrong}>
                ❌ Falsch! Richtig wäre:{" "}
                <strong>{question.correct.name}</strong>
              </div>
            )}

            <button
              onClick={nextQuestion}
              style={styles.next}
            >
              Nächste Frage →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    padding: "30px 20px",
    boxSizing: "border-box",
  },

  game: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "28px",
    background: "#ffffff",
    boxShadow: "0 15px 40px rgba(0,0,0,0.10)",
    textAlign: "center",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  smallTitle: {
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "2px",
    opacity: 0.55,
    textAlign: "left",
  },

  title: {
    margin: "5px 0 0",
    fontSize: "32px",
  },

  score: {
    fontSize: "22px",
    fontWeight: "800",
    padding: "10px 16px",
    borderRadius: "14px",
    background: "#f5f5f5",
  },

  questionInfo: {
    marginTop: "30px",
    fontSize: "15px",
    opacity: 0.6,
  },

  flag: {
    fontSize: "120px",
    margin: "25px 0",
    lineHeight: 1,
  },

  question: {
    fontSize: "24px",
    marginBottom: "25px",
  },

  answers: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  answer: {
    border: "2px solid #e5e5e5",
    borderRadius: "14px",
    padding: "16px",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.2s",
  },

  result: {
    marginTop: "25px",
  },

  correct: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "15px",
  },

  wrong: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "15px",
  },

  next: {
    border: "none",
    borderRadius: "14px",
    padding: "15px 25px",
    fontSize: "17px",
    fontWeight: "800",
    cursor: "pointer",
    background: "#111111",
    color: "#ffffff",
  },
};
