import React from 'react';

import DumbWidget from './components/DumbWidget';
import QuoteOfTheDay from 'dashr-widget-quote-of-the-day';
import ToDo from 'dashr-widget-todo';
import Weather from 'dashr-widget-weather';

export const DEFAULTS = {
  backgroundColor: '#F38630',
};

export const widgets = {
  [DumbWidget.id]: (args) => <DumbWidget {...args} />,
  [QuoteOfTheDay.id]: (args) => <QuoteOfTheDay {...args} />,
  [ToDo.id]: (args) => <ToDo {...args} />,
  [Weather.id]: (args) => <Weather {...args} />,
};

export const widgetClasses = {
  [DumbWidget.id]: () => DumbWidget,
  [QuoteOfTheDay.id]: () => QuoteOfTheDay,
  [ToDo.id]: () => ToDo,
  [Weather.id]: () => Weather,
};
