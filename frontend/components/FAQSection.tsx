const faqs = [
  {
    q: "Is this a clinical diagnosis?",
    a: "No. It is a statistical estimate from a random forest trained on survey data. It cannot replace a clinician or campus counselling.",
  },
  {
    q: "Are my inputs saved anywhere?",
    a: "No. Your twelve fields are sent to POST /predict to compute the score and returned immediately without database storage or tracking.",
  },
  {
    q: "Why are input ranges constrained?",
    a: "Fields are bounded to the observed ranges in the 5,000-student training data (for example age 18–24 and sleep 3.6–9.9 hours) so the model does not extrapolate.",
  },
  {
    q: "What drives the prediction most?",
    a: "In the training dataset, average daily social media usage (−0.816) and nightly sleep (+0.766) have the strongest linear correlations with the score.",
  },
];

export function FAQSection() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section__head">
          <div>
            <h2 className="section__title">Questions</h2>
            <p className="section__desc">
              Scope, data handling, and model limitations.
            </p>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((item) => (
            <article className="faq-item" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
