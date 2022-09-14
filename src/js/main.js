import { isWebp } from './modules/utils.js';
import './modules/lazyload.js';
import './modules/dropdown.js';
import AirDatepicker from 'air-datepicker';
import localeRu from 'air-datepicker/locale/ru.js';
import { createPopper } from '@popperjs/core';

// eslint-disable-next-line no-new
new AirDatepicker('#datapicker', {
  locale: localeRu,
  container: '#scroll-container',
  selectedDates: [new Date('02.02.2021')],
  visible: false,
  autoClose: true,
  prevHtml: '<svg (width=12 height=10.66)><use xlink:href="img/sprites/sprite-noattr.svg#arrow-left"></use></svg>',
  nextHtml: '<svg (width=12 height=10.66)><use xlink:href="img/sprites/sprite-noattr.svg#arrow-right"></use></svg>',
  position({
    $datepicker, $target, $pointer, done
  }) {
    let popper = createPopper($target, $datepicker, {
      placement: 'top',
      modifiers: [
        {
          name: 'flip',
          options: {
            padding: {
              top: 64
            }
          }
        },
        {
          name: 'offset',
          options: {
            offset: [0, 20]
          }
        },
        {
          name: 'arrow',
          options: {
            element: $pointer
          }
        }
      ]
    });

    /*
  Возвращаем функцию, которая вызывается при срабатывании `hide()`,
  она обязательно должна вызвать функцию `done()`
   для завершения процесса скрытия календаря
  */
    return function completeHide() {
      popper.destroy();
      done();
    };
  }
});

isWebp();
