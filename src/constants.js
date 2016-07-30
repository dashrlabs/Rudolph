import React from 'react';

import AusPost from 'dashr-widget-auspost';
import Clock from 'dashr-widget-clock';
import Compliments from 'dashr-widget-compliments';
import CPUUsage from './chrome-widgets/CPUUsage';
// import DinoGame from 'dashr-widget-dinogame';
import DumbWidget from './components/DumbWidget';
import ImageView from 'dashr-widget-imageview';
import GMail from './chrome-widgets/GMail';
import QuoteOfTheDay from 'dashr-widget-quote-of-the-day';
import RAMUsage from './chrome-widgets/RAMUsage';
import ToDo from 'dashr-widget-todo';
import TopSites from './chrome-widgets/TopSites';
import Weather from 'dashr-widget-weather';

export const DEFAULTS = {
  backgroundColor: '#F38630',
};

const w = [AusPost, Clock, Compliments, CPUUsage, DumbWidget, ImageView, GMail, QuoteOfTheDay, RAMUsage, ToDo, TopSites, Weather];

export const widgets = {};
export const widgetClasses = {};

w.forEach((widget) => {
  widgets[widget.id] = (args) => <widget {...args} />;
  widgetClasses[widget.id] = () => widget;
});
