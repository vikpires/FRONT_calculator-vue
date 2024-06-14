import { createApp } from 'vue';
import App from './App.vue';
import { setComponent } from './modules/component.module';


const app = createApp(App);
setComponent(app);
app.mount('#app');
