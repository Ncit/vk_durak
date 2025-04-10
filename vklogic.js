function initVkBridgeApp() {
	vkBridge.send("VKWebAppInit", {});
}

function friendsInvite() {
	vkBridge.send('VKWebAppGetFriends')
  .then((data) => { 
    if (data) {
      // Данные о пользователях
      console.log(data.users);
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });

}