// (1) Variablen initialisieren
const formContainer = document.getElementById("formContainer");
const thankYouContainer = document.getElementById("gamecontainer");
const submitButton = document.getElementById("submit");
submitButton.disabled = true;
const emailField = document.getElementById("email");
const form = document.getElementById("form");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const phone = document.getElementById("phone");
const emailErrorMessage = document.getElementById("email-error-message");
const phoneErrorMessage = document.getElementById("phone-error-message");

// (2) Interaktionen festlegen
emailField.addEventListener("keyup", () => {
  onChangeEmailField();
});
first_name.addEventListener("keyup", () => {
  onChangeEmailField();
});
last_name.addEventListener("keyup", () => {
  onChangeEmailField();
});
phone.addEventListener("keyup", () => {
  onChangeEmailField();
});
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  onClickSubmit();
});

// (3) Interaktionen Code
// (3) Interaktionen Code
const onChangeEmailField = () => {
  const validCharacters = /^[0-9+]+$/;
  const isPhoneValid =
    phone.value.startsWith("+41") &&
    phone.value.length === 12 &&
    phone.value.match(validCharacters);
  const isEmailValid = emailField.value.includes("@") && emailField.value.length >= 4;

  if (
    emailField.value === "" ||
    first_name.value === "" ||
    last_name.value === "" ||
    phone.value === "" ||
    !isPhoneValid ||
    !isEmailValid
  ) {
    submitButton.disabled = true;
    submitButton.classList.remove("valid");
  } else {
    submitButton.disabled = false;
    submitButton.classList.add("valid");
  }

  // Überprüfen, ob die E-Mail ein @-Zeichen enthält und mindestens 4 Zeichen lang ist
  if (isEmailValid) {
    emailErrorMessage.textContent = "";
  } else if (emailField.value) {
    emailErrorMessage.textContent = "Die E-Mail muss ein @ enthalten und mindestens 4 Zeichen lang sein";
  }

  // Überprüfen, ob die Telefonnummer mit "+41" beginnt und 12 Stellen lang ist
  if (isPhoneValid) {
    phoneErrorMessage.textContent = "";
  } else if (phone.value) {
    phoneErrorMessage.textContent = "Die Telefonnummer muss mit +41 beginnen und 12 Stellen lang sein";
  }
};


const onClickSubmit = async () => {
  // Überprüfen, ob die Felder ausgefüllt sind
  if (!emailField.value.includes("@")) {
    emailErrorMessage.textContent = "E-Mail muss ein @ enthalten";
    return;
  }

  if (!phone.value.startsWith("+41") || phone.value.length !== 12 || !phone.value.match(/^[0-9+]+$/)) {
    return;
  }


  // Daten aus dem Formular für die Datenbank bereitstellen
  const data = {
    group: "al5", // SQL Gruppen Namen
    pw: "217f384d", // SQL Passwort
    tableName: "user", // Name der Tabelle in der SQL Datenbank

    columns: {
      // "email" Name der Spalte in der SQL Tabelle
      // "emailField.value" Eingabe des Benutzers aus dem Formularfeld
      email: emailField.value,
    },
  };
  // Speichert die Daten in der Datenbank
  await databaseClient.insertInto(data);

  // Nach dem Speichern verschwindet das Formular, eine Dankeschön Nachricht erscheint
  formContainer.classList.add("hidden");
  gamecontainer.classList.remove("hidden");
};
