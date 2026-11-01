const API_URL = "http://127.0.0.1:8000/predict";

const form = document.querySelector("#prediction-form");
const submitButton = form.querySelector(".predict-button");
const buttonText = form.querySelector(".button-text");
const errorMessage = document.querySelector("#form-error");
const resultCard = document.querySelector("#result-card");
const scoreValue = document.querySelector("#score-value");
const scoreMeter = document.querySelector("#score-meter");
const scoreMessage = document.querySelector("#score-message");
const resetButton = document.querySelector("#new-assessment");

function makePayload() {
  const values = new FormData(form);
  return {
    age: Number(values.get("age")),
    gender: values.get("gender"),
    country: values.get("country").trim(),
    academic_level: values.get("academic_level"),
    most_used_platform: values.get("most_used_platform"),
    purpose_of_use: values.get("purpose_of_use"),
    avg_daily_usage_hours: Number(values.get("avg_daily_usage_hours")),
    daily_unlocks: Number(values.get("daily_unlocks")),
    study_hours: Number(values.get("study_hours")),
    physical_activity_hours: Number(values.get("physical_activity_hours")),
    sleep_hours_per_night: Number(values.get("sleep_hours_per_night")),
    stress_level: values.get("stress_level"),
  };
}

function resultCopy(score) {
  if (score >= 8) return "A strong estimated score. Keep protecting the routines that support you.";
  if (score >= 5) return "A balanced estimated score. Small, consistent habits can make a meaningful difference.";
  return "This estimate suggests it may help to pause, reflect, and reach out for support if you need it.";
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function setLoading(isLoading) {
  submitButton.classList.toggle("is-loading", isLoading);
  submitButton.disabled = isLoading;
  buttonText.textContent = isLoading ? "Calculating your score..." : "Estimate my score";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;
  resultCard.hidden = true;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(makePayload()),
    });

    const data = await response.json();
    if (!response.ok) {
      const detail = Array.isArray(data.detail) ? data.detail[0]?.msg : data.detail;
      throw new Error(detail || "The prediction could not be completed. Please review your details.");
    }

    const score = data.predicted_mental_health_score;
    scoreValue.textContent = Number(score).toFixed(2);
    scoreMeter.value = score;
    scoreMeter.textContent = `${Number(score).toFixed(2)} out of 10`;
    scoreMeter.style.setProperty(
      "--meter-color",
      score < 5 ? "#c54444" : score < 7 ? "#c88422" : "#0e766c",
    );
    scoreMessage.textContent = resultCopy(score);
    resultCard.hidden = false;
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    const message = error instanceof TypeError
      ? "We could not reach the API. Confirm that FastAPI is running on port 8000."
      : error.message;
    showError(message);
  } finally {
    setLoading(false);
  }
});

resetButton.addEventListener("click", () => {
  resultCard.hidden = true;
  form.reset();
  form.querySelector("[name='age']").value = 20;
  form.querySelector("[name='country']").value = "India";
  form.querySelector("[name='avg_daily_usage_hours']").value = 6;
  form.querySelector("[name='daily_unlocks']").value = 171;
  form.querySelector("[name='study_hours']").value = 4;
  form.querySelector("[name='physical_activity_hours']").value = 1;
  form.querySelector("[name='sleep_hours_per_night']").value = 7;
  form.querySelector("[name='gender']").value = "Male";
  form.querySelector("[name='academic_level']").value = "Undergraduate";
  form.querySelector("[name='most_used_platform']").value = "Instagram";
  form.querySelector("[name='purpose_of_use']").value = "Education";
  form.querySelector("[name='stress_level']").value = "Medium";
  errorMessage.hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
});
