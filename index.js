const submit_btn = document.getElementById("submit_btn");

const contact_name = document.getElementById("name");
const email = document.getElementById("email");
const body = document.getElementById("body");

const name_error = document.getElementById("name_error");
const email_error = document.getElementById("email_error");
const body_error = document.getElementById("body_error");

const email_exp = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/;
const body_exp = /^.{1,10}$/;

//サーバにデータを送信（{deploy_id}は各自の環境に依存）
const api_url = "https://script.google.com/macros/s/{デプロイID}/exec";

submit_btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (contact_name.value == "") {
        name_error.classList.remove("hidden");
    }

    if (!email_exp.test(email.value)) {
        email_error.classList.remove("hidden");
    }

    if (!body_exp.test(body.value)) {
        body_error.classList.remove("hidden");
    }

    if (name_error.classList.contains("hidden") && email_error.classList.contains("hidden") && body_error.classList.contains("hidden")) {
        fetch(api_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`name=${contact_name.value}&email=${email.value}&body=${body.value}`)
        })
            .then((response) => {
                response.json().then((json) => {
                    alert(json.message);
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    }
});

contact_name.addEventListener("keyup", (e) => {
    if (contact_name.value == "") {
        name_error.classList.remove("hidden");
    } else {
        name_error.classList.add("hidden");
    }
});

email.addEventListener("keyup", (e) => {
    if (!email_exp.test(email.value)) {
        email_error.classList.remove("hidden");
    } else {
        email_error.classList.add("hidden");
    }
});

body.addEventListener("keyup", (e) => {
    if (!body_exp.test(body.value)) {
        body_error.classList.remove("hidden");
    } else {
        body_error.classList.add("hidden");
    }
})