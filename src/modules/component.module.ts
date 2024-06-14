import { App } from 'vue';
import CalculatorButton from '../components/CalculatorButton.vue';
import CalculatorDisplay from '../components/CalculatorDisplay.vue';
import CalculatorMenu from '../components/CalculatorMenu.vue';
import Calculator from '../components/Calculator.vue';


export function setComponent(app:App) {
    app.component('CalculatorButton', CalculatorButton);
    app.component('CalculatorDisplay', CalculatorDisplay);
    app.component('CalculatorMenu', CalculatorMenu);
    app.component('Calculator', Calculator);
}