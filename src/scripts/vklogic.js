
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
      appDataCallback(auth(data.vk_app_id))
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}

function auth(userId) {
  vkBridge.send('VKWebAppGetUserInfo', {
  user_id: userId
  })
  .then((data) => { 
    if (data.id) {
      // Данные пользователя получены
      console.log(data); 
      return data;     
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}