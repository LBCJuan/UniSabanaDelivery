Page({
  data: {
    clave: '',
    telefono: '',
  },
  onLoad() { },
  redirectToRegister() {
    my.redirectTo({
      url: '/pages/Register/Register'
    })
  },
  redirectToHome() {
    if (this.data.clave && this.data.telefono) {
      my.request({
        url: `http://192.168.20.22:4700/PerfilUsuario/verificar`,
        headers: {},
        method: 'GET',
        data: { clave: this.data.clave, telefono: this.data.telefono },
        timeout: 30000,
        dataType: '',
        success: (result) => {
          my.redirectTo({
            url: '/pages/Home/Home'
          })
        },
        fail: () => {
          this.setData({
            error: 'Ha ocurrido un error'
          })
        },
        complete: () => {

        }
      });
    }
    else {
      my.alert({ title: 'Oops', content: 'Por favor completa todos los campos' });
    }
  },
  updateInfo(e) {
    this.setData({
      ...this.data,
      [e.target.dataset.id]: e.detail.value
    })
  },
  verificarTelefono() {

    const channel = "sms";
    const locale = "es";
    to = "+57" + this.data.telefono;

    console.log(channel);
    console.log(locale);
    console.log(to);

    // Twilio functions do not accept multipart/form-data
    const data = new URLSearchParams();
    data.append("to", to);
    data.append("channel", channel);
    data.append("locale", locale);

    console.log(data);

    my.request({
      url: 'https://verify-7299-nmbvmh.twil.io/start-verify',
      headers: {},
      method: 'POST',
      timeout: 30000,
      body: data,
      mode: 'cors'
    })
      .then(response => {

        const content = $(".result-message");
        content.empty();
        return response.json()
      })
      .then(json => {
        if (json.success) {
          $("#form-error").empty();
          $(".modal").modal("show");
          console.log("Successfully sent token.");
        } else {
          console.log(json.error);
          showVerificationStartError(
            `${json.error.message} <a href="${json.error.moreInfo}">[more info]</a>`);
        }
      })
      .catch(err => {
        console.log(err);
        showVerificationStartError("Error starting verification.");
      });
  }
});

// Verificacion

const phoneInputField = this.data.telefono;
const phoneInput = window.intlTelInput(phoneInputField, {
  // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  preferredCountries: ["co"],
  separateDialCode: true,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.11/js/utils.js"
});

function showVerificationStatus(alertType, message) {
  var content = $(".result-message");
  content.empty();
  content.append($("<div>")
    .addClass(`alert alert-${alertType}`)
    .attr("role", "alert")
    .text(message))
}

function showVerificationStartError(error) {
  var content = $("#form-error");
  content.empty();
  content.append(`Error: ${error}`);
}

var to;

$("#verification").submit(function (event) {
  event.preventDefault();
  const code = $("#verification_code").val();

  // Twilio functions do not accept multipart/form-data
  const data = new URLSearchParams();
  data.append("to", to);
  data.append("verification_code", code);

  fetch("https://verify-7299-nmbvmh.twil.io/check-verify", {
    method: 'POST',
    body: data,
    mode: 'cors'
  })
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        showVerificationStatus("success", json.message);
        $("#verification_code").val("");
      } else {
        showVerificationStatus("danger", json.message);
        $("#verification_code").val("");
      }
    })
    .catch(err => {
      console.log(err);
      showVerificationStatus("danger", "Something went wrong!");
      $("#verification_code").val("");
    });
});

const locales = [
  { text: "Spanish", value: "es" },
];

const selectLocale = "es";
