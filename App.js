import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox} from 'react-native';
import Navigation from './src/navigation/index';
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const translationGetters = {
  en: () => require('./src/locales/en.json'),
  nl: () => require('./src/locales/nl.json')
}

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
)

const setI18nConfig = () => {
  const fallback = { languageTag: 'en' }
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback
  translate.cache.clear()
  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}

const App = () => {
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
