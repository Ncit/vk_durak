function initVkBridgeApp() {
	vkBridge.send("VKWebAppInit", {});
}

function friendsInvite() {
	vkBridge.send('VKWebAppGetFriends')
  .then((data) => { 
    if (data) {
      // Данные о пользователях
      alert(data.users);
      console.log(data.users);
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}

function setupApp(appDataCallback) {
  vkBridge.send('VKWebAppGetLaunchParams')
  .then((data) => { 
    if (data.vk_app_id) {
      // Параметры запуска получены
      appDataCallback(data)
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}

// function auth() {
//   bridge.send('VKWebAppGetUserInfo', {
//   user_id: 743784474
//   })
//   .then((data) => { 
//     if (data.id) {
//       // Данные пользователя получены
//       console.log(data);      
//     }
//   })
//   .catch((error) => {
//     // Ошибка
//     console.log(error);
//   });
// }