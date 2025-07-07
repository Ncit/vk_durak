// import { createClient } from '@supabase/supabase-js'

function initVkBridgeApp() {
	vkBridge.send("VKWebAppInit", {});
  // const supabase = createClient('https://5e92-2a12-5940-5517-00-2.ngrok-free.app$0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE')
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
  bridge.send('VKWebAppGetLaunchParams')
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