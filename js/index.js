// Открытие и закрытие модального окна
const modal = document.getElementById("modal");
const btn = document.getElementById("open-modal");
const span = document.getElementsByClassName("custom-close")[0];
const submitButton = document.getElementById("submit-button");
const paymentOption = document.getElementById("payment-option");
const cryptoPaymentCheckbox = document.getElementById("crypto-payment");

// Открыть модальное окно
btn.onclick = function() {
    modal.style.display = "block";
    document.body.classList.add("no-scroll"); // Добавляем класс для отключения прокрутки
}

// Закрыть модальное окно
span.onclick = function() {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll"); // Убираем класс для включения прокрутки
}

// Закрыть модальное окно при клике вне его
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.classList.remove("no-scroll"); // Убираем класс для включения прокрутки
    }
}

// Обработка клика по блоку с чекбоксом
paymentOption.onclick = function() {
    cryptoPaymentCheckbox.checked = !cryptoPaymentCheckbox.checked; // Переключаем состояние чекбокса
    paymentOption.classList.toggle("active", cryptoPaymentCheckbox.checked); // Добавляем/убираем класс для активного состояния
}

// Обработка отправки данных
submitButton.onclick = function() {
    const amount = document.getElementById("amount").value;
    const paymentMethod = cryptoPaymentCheckbox.checked ? "Оплата криптовалютой" : null;

    // Пример отправки данных (здесь вы можете добавить свою логику)
    if (paymentMethod && amount) {
        alert(`Способ оплаты: ${paymentMethod}\nСумма: ${amount}`);
        modal.style.display = "none"; // Закрыть модальное окно после отправки
        document.body.classList.remove("no-scroll"); // Убираем класс для включения прокрутки
    } else {
        alert("Пожалуйста, выберите способ оплаты и введите сумму.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const initData = btoa(window.Telegram.WebApp.initData);

    if (currentPath === "/") {
    fetch("https://test0123481.ru/api/user/profile/?lang=ru", {
        headers: { Authorization: initData },
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
        const userName = `${data.user.firstName} ${data.user.lastName}`;
        const balance = `${data.user.balance}`;
        const name = `${data.series.name}`;
        const number = `${data.series.number}`;
        const progressValue = `${data.progress}`;
        const newsArray = data.news;

        document.getElementById("userName").innerHTML = userName;
        document.getElementById("balance").textContent = balance;
        document.getElementById("name").textContent = `Серия ${number}`;
        document.getElementById("number").textContent = `"${name}"`;
        document.getElementById("progress").style.width =
          progressValue * 100 + "%";
        document.getElementById("avatarLink").src = data.user.avatarLink;
        document.getElementById("communityLink").href = data.communityLink;
        document.getElementById("iconLink").href = data.iconLink;
        document.getElementById("supportLink").href = data.supportLink;

        for (let i = 0; i < newsArray.length; i++) {
            let newsElement = `<a href="${newsArray[i].telegraphLink}" class="advertising__blocks" style="height: inherit;"><img src='${newsArray[i].imageLink}' style='height: inherit; border-radius: 10px;width:100%;'></a>`;
            document.getElementById("newsContainer").innerHTML += newsElement;
        }
        })
        .catch((error) => console.error("Ошибка:", error));
    }
});
