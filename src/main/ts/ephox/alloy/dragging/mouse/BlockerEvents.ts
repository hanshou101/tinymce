import * as AlloyEvents from '../../api/events/AlloyEvents';
import NativeEvents from '../../api/events/NativeEvents';

const init = function (dragApi) {
  return AlloyEvents.derive([
    // When the user clicks on the blocker, something has probably gone slightly
    // wrong, so we'll just drop for safety. The blocker should really only
    // be there when the mouse is already down and not released, so a 'click'
    AlloyEvents.run(NativeEvents.mousedown(), dragApi.forceDrop),

    // When the user releases the mouse on the blocker, that is a drop
    AlloyEvents.run(NativeEvents.mouseup(), dragApi.drop),

    // As the user moves the mouse around (while pressed down), we move the
    // component around
    AlloyEvents.run(NativeEvents.mousemove(), function (comp, simulatedEvent) {
      dragApi.move(simulatedEvent.event());
    }),

    // When the use moves outside the range, schedule a block to occur but
    // give it a chance to be cancelled.
    AlloyEvents.run(NativeEvents.mouseout(), dragApi.delayDrop)
  ]);
};

export {
  init
};