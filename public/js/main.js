const $signup = document.querySelector("[data-signup]");
const $name = document.querySelector("[data-name]");
const $signUpWr = document.querySelector("[data-signupwr]");
const $send = document.querySelector("[data-send]");
const $textInput = document.querySelector("[data-text]");
const $avatar = document.querySelector("[data-avatar]");
const $messages = document.querySelector("[data-messages]");

const generateMessageTemplate = function (message) {
  return `
  <div class="messageWr ${message.isAuthor ? "myMessage" : ""} d-flex">
  <div>
    <img class="avatar" src="${message.avatar}" alt="avatar">
  </div>
  <div class="dataWr">
    <div class="messageInfo">
  <span class="messageAuthorName">${message.name}</span>
  <span class="messageDate">${message.date}</span>
  </div>
  <div>
  <p class="messageText">
    ${message.text}
  </p>
  </div>
  </div>
  </div>
  `;
};

const generateConnectionTemplate = function (data) {
  return `
<p class="connection">${data.name} присоединился к чату</p>
`;
};

let event_choice = [$name, $signup];
event_choice.forEach((event) => {
  event.addEventListener(event === $name ? "keydown" : "click", (e) => {
    if ((event === $name && e.code === "Enter") || event === $signup) {
      //console.log(e.code);
      const person = {
        id: Date.now(),
        name: $name.value,
        avatar: $avatar.value,
      };
      console.log($name.value);
      $signUpWr.remove();

      $messages.classList.remove('chat')
console.log($messages.classList)
      const socket = new WebSocket(
        window.location.origin.replace("http", "ws")
      );

      socket.onopen = function (e) {
        socket.send(
          JSON.stringify({
            ...person,
            type: "SignUp",
          })
        );
      };

      socket.onmessage = function (event) {
        const parsedMessage = JSON.parse(event.data);
        switch (parsedMessage.type) {
          case "SignUp":
            console.log(parsedMessage);
            const connectionTemplate =
              generateConnectionTemplate(parsedMessage);
            $messages.insertAdjacentHTML("beforeend", connectionTemplate);
            break;
          case "text":
            const options = {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            };

            parsedMessage.date = new Date(
              parsedMessage.date
            ).toLocaleDateString("ru-RU",  options);
            const messageTemplate = generateMessageTemplate(parsedMessage);
            $messages.insertAdjacentHTML("beforeend", messageTemplate);
            console.log(parsedMessage.date);
            
          default:
            break;
        }
      };

      $send.addEventListener("click", () => {
        if ($textInput.value !== "") {
          socket.send(
            JSON.stringify({
              personId: person.id,
              type: "text",
              text: $textInput.value,
            })
          );
        }
        $textInput.value = "";
      });
      $textInput.addEventListener("keydown", (e) => {
        if (e.code === "Enter" && $textInput.value !== "") {
          socket.send(
            JSON.stringify({
              personId: person.id,
              type: "text",
              text: $textInput.value,
            })
          );

          $textInput.value = "";
        }
      });

      /* socket.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
      } else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        alert('[close] Соединение прервано');
      }
    };*/

      socket.onerror = function (error) {
        console.log(`[error]`);
      };
    }
  });
});

/* $signup.addEventListener("click", (e) => {
   }); */
