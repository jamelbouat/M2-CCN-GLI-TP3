import Vue from 'vue';

const defaultBackgroundColor = 'lightBlue';
// const defaultText = 'blue';
// const newvalue = '';

export const Background = {
    bind(el, binding) {
        if (el ) {
            const color = binding.expression || defaultBackgroundColor;
            el.style.backgroundColor = color
            el.innerHTML = 'My background text is :  ' + color;
        }
    },
};

Vue.directive('background', Background);

