// Получаем элементы страницы
var mishki = document.getElementById("mishki");
var messages = document.getElementById("messages");
var userInput = document.getElementById("user-input");
var sendButton = document.getElementById("send-button");

// Создаем переменные для хранения данных о заказе
var order = {
  name: "",
  price: 0,
  img: "",
  quantity: 0,
  total: 0
};

// Создаем функцию для добавления сообщения в чат
var addMessage = function(sender, text, img) {
  // Создаем элементы для сообщения
  var li = document.createElement("li");
  var image = document.createElement("img");
  var p = document.createElement("p");

  // Добавляем классы и атрибуты в зависимости от отправителя
  li.classList.add(sender);
  image.src = img;
  image.alt = sender;
  p.textContent = text;

  // Добавляем элементы в список сообщений
  li.appendChild(image);
  li.appendChild(p);
  messages.appendChild(li);

  // Прокручиваем чат вниз
  messages.scrollTop = messages.scrollHeight;
};

// Создаем функцию для обработки выбора мишки
var chooseMishka = function(event) {
  // Получаем данные о мишке из атрибутов элемента
  var name = event.target.dataset.name;
  var price = event.target.dataset.price;
  var img = event.target.dataset.img;

  // Сохраняем данные о мишке в заказ
  order.name = name;
  order.price = price;
  order.img = img;

  // Добавляем сообщение от пользователя в чат
  addMessage("user", "Я хочу заказать " + name, "./images/user.jpg");

  // Добавляем сообщение от бота в чат
  addMessage("bot", "Отличный выбор! " + name + " стоит " + price + " рублей за штуку. Сколько мишек вы хотите заказать?", "./images/logo.jpg");
};

// Создаем функцию для обработки ввода пользователя
var sendInput = function() {
  // Получаем текст из поля ввода
  var text = userInput.value;

  // Проверяем, что текст не пустой
  if (text) {
    // Очищаем поле ввода
    userInput.value = "";

    // Добавляем сообщение от пользователя в чат
    addMessage("user", text, "./images/user.jpg");

    // Проверяем, что пользователь выбрал мишку
    if (order.name) {
      // Проверяем, что пользователь ввел число
      if (isNaN(text)) {
        // Добавляем сообщение от бота в чат
        addMessage("bot", "Извините, я не понимаю, что вы имеете в виду. Пожалуйста, введите число от 1 до 10, чтобы указать количество мишек, которые вы хотите заказать.", "./images/logo.jpg");
      } else {
        // Преобразуем текст в число
        var number = parseInt(text);

        // Проверяем, что число в допустимом диапазоне
        if (number < 1 || number > 10) {
          // Добавляем сообщение от бота в чат
          addMessage("bot", "Извините, мы можем принять заказ только от 1 до 10 мишек. Пожалуйста, введите число в этом диапазоне.", "./images/logo.jpg");
        } else {
          // Сохраняем количество мишек в заказе
          order.quantity = number;

          // Вычисляем общую стоимость заказа
          order.total = order.price * order.quantity;

          // Добавляем сообщение от бота в чат
          addMessage("bot", "Спасибо, вы заказали " + order.quantity + " мишек " + order.name + ". Общая стоимость вашего заказа составляет " + order.total + " рублей. Для подтверждения заказа введите свой адрес доставки.", "./images/logo.jpg");
        }
      }
    } else {
      // Добавляем сообщение от бота в чат
      addMessage("bot", "Извините, я не понимаю, что вы хотите заказать. Пожалуйста, выберите мишку из списка слева, кликнув по нему.", "./images/logo.jpg");
    }
  }
};

// Добавляем обработчики событий для элементов страницы
mishki.addEventListener("click", chooseMishka);
sendButton.addEventListener("click", sendInput);
userInput.addEventListener("keypress", function(event) {
  if (event.key == "Enter") {
    sendInput();
  }
});
