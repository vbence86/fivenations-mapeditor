import EventEmitter from 'event-emitter';

let singleton;

/**
 * Singleton pattern around an EventEmitter to make it useble across
 * the whole application
 */
export default {
  getInstance() {
    if (!singleton) {
      singleton = EventEmitter();
    }
    return singleton;
  },
};
