emailjs.init("7jEU1Vh-QYTZPfs9z");

function sendEmail() {
  const form = document.getElementById("emailForm");
  const fromName = form.elements["fromName"].value;
  const emailID = form.elements["emailID"].value;
  const phoneNo = form.elements["phoneNo"].value;
  const message = form.elements["message"].value;

  emailjs
    .send("service_bstzgr6", "template_jctwh0j", {
      from_name: fromName,
      email_id: emailID,
      phno: phoneNo,
      message: message,
    })
    .then(
      function (response) {
        document.getElementById("send-success").style.display = "block";
        setTimeout(() => {
          document.getElementById("send-success").style.display = "none";
        }, 5000);
      },
      function (error) {
        document.getElementById("send-failed").style.display = "block";
        setTimeout(() => {
          document.getElementById("send-failed").style.display = "none";
        }, 5000);
      }
    );
}

function displayError(id, show) {
  const element = document.getElementById(id);
  element.style.display = show ? "block" : "none";
}

function isValidEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  // Assumes a simple pattern of 10 digits
  const pattern = /^\d{10}$/;
  return pattern.test(phoneNumber);
}

function validateForm(event) {
  let isValid = false;
  event.preventDefault();
  const fromName = document.getElementById("fromName").value;
  const emailID = document.getElementById("emailID").value;
  const phoneNo = document.getElementById("phoneNo").value;
  const message = document.getElementById("message").value;
  displayError("name-required", fromName === "");
  displayError("email-required", emailID === "");
  displayError("number-required", phoneNo === "");
  displayError("message-required", message === "");
  displayError("email-valid", !isValidEmail(emailID));
  displayError("number-valid", !isValidPhoneNumber(phoneNo));
  isValid =
    fromName &&
    emailID &&
    phoneNo &&
    message &&
    isValidEmail(emailID) &&
    isValidPhoneNumber(phoneNo);

  isValid && sendEmail();
  return false;
}
