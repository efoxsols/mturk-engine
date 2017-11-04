import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as immutableTransform from 'redux-persist-transform-immutable';
import { autoRehydrate, persistStore } from 'redux-persist';
import * as localForage from 'localforage';
import { rootReducer } from './reducers';
import rootSaga from './sagas';

// tslint:disable:no-any
// tslint:disable:no-string-literal
const devtools: any = window['__REDUX_DEVTOOLS_EXTENSION__']
  ? window['__REDUX_DEVTOOLS_EXTENSION__']()
  : (f: any) => f;

const sagaMiddleware = createSagaMiddleware();

const store = createStore<any>(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), autoRehydrate(), devtools)
);

sagaMiddleware.run(rootSaga);

persistStore(
  store,
  {
    whitelist: [
      'account',
      'hitBlocklist',
      'hitDatabase',
      'requesterBlocklist',
      'searchFormActive',
      'sortingOption',
      'searchOptions',
      'topticonSettings',
      'watchers',
      'audioSettingsV1',
      'dailyEarningsGoal'
    ],
    storage: localForage,
    transforms: [
      immutableTransform({
        whitelist: [
          'hitBlocklist',
          'requesterBlocklist',
          'watchers',
          'hitDatabase'
        ]
      })
    ]
  },
  err =>
    err
      ? console.warn(
          `There was an issue retrieving your Mturk Engine settings. Error Log: ` +
            err
        )
      : undefined
);

export default store;
