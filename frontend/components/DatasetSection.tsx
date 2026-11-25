const stats = [
  { value: "5,000", label: "Student responses" },
  { value: "6.23", label: "Sample mean (0–10)" },
  { value: "−0.816", label: "Daily usage vs. score" },
  { value: "+0.766", label: "Sleep hours vs. score" },
];

const stressBands = [
  { label: "Low", value: 7.84 },
  { label: "Medium", value: 7.14 },
  { label: "High", value: 6.03 },
  { label: "Very high", value: 5.05 },
];

const sleepBands = [
  { label: "Under 6 h", value: 5.11 },
  { label: "6–7 h", value: 6.1 },
  { label: "7–8 h", value: 7.2 },
  { label: "8 h +", value: 7.64 },
];

const steps = [
  {
    num: "01",
    title: "Twelve everyday inputs",
    body: "Demographics, primary platform, screen time, phone unlocks, study, exercise, sleep, and self-reported stress.",
  },
  {
    num: "02",
    title: "Random forest regression",
    body: "Trained on Student Social Media And Mental Health Impact.csv (n = 5,000, R² 0.878) using scikit-learn.",
  },
  {
    num: "03",
    title: "Score with context",
    body: "Returns a continuous 0–10 estimate alongside the sample mean (6.23) without storing personal entries.",
  },
];

function BarPanel({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: { label: string; value: number }[];
}) {
  return (
    <div className="panel">
      <h3 className="panel__title">{title}</h3>
      <p className="panel__sub">{subtitle}</p>
      <div className="bar-list">
        {rows.map((row) => (
          <div className="bar-row" key={row.label}>
            <span>{row.label}</span>
            <span className="bar-track" aria-hidden="true">
              <i style={{ width: `${(row.value / 10) * 100}%` }} />
            </span>
            <b>{row.value.toFixed(2)}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DatasetSection() {
  return (
    <>
      <section className="section" id="dataset">
        <div className="container">
          <div className="section__head">
            <div>
              <h2 className="section__title">What the dataset shows</h2>
              <p className="section__desc">
                Descriptive group means and Pearson correlations from the 5,000-row
                student survey in this repository.
              </p>
            </div>
            <span className="mono" style={{ color: "var(--ink-muted)" }}>
              n = 5,000 · range 3.6–9.4
            </span>
          </div>

          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="bento-2">
            <BarPanel
              title="Score by stress level"
              subtitle="Group mean on 0–10 scale"
              rows={stressBands}
            />
            <BarPanel
              title="Score by sleep duration"
              subtitle="Group mean on 0–10 scale"
              rows={sleepBands}
            />
          </div>
        </div>
      </section>

      <section className="section" id="method">
        <div className="container">
          <div className="section__head">
            <div>
              <h2 className="section__title">How the estimate works</h2>
              <p className="section__desc">
                One stateless API call from the browser to the FastAPI model
                endpoint.
              </p>
            </div>
            <span className="mono" style={{ color: "var(--ink-muted)" }}>
              FastAPI · scikit-learn 1.6.1
            </span>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <div className="step-card" key={step.num}>
                <span className="step-card__num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
