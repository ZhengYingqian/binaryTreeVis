export const specInit = {
  '$schema': 'https://vega.github.io/schema/vega-lite/v3.json',
  'repeat': {
    'row': ['Horsepower', 'Acceleration', 'Miles_per_Gallon'],
    'column': ['Miles_per_Gallon', 'Acceleration', 'Horsepower']
  },
  'spec': {
    'data': {'url': 'data/cars.json'},
    'mark': 'point',
    'selection': {
      'brush': {
        'type': 'interval',
        'resolve': 'union',
        'on': '[mousedown[event.shiftKey], window:mouseup] > window:mousemove!',
        'translate': '[mousedown[event.shiftKey], window:mouseup] > window:mousemove!',
        'zoom': 'wheel![event.shiftKey]'
      },
      'grid': {
        'type': 'interval',
        'resolve': 'global',
        'bind': 'scales',
        'translate': '[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!',
        'zoom': 'wheel![!event.shiftKey]'
      }
    },
    'encoding': {
      'x': {'field': {'repeat': 'column'}, 'type': 'quantitative'},
      'y': {
        'field': {'repeat': 'row'},
        'type': 'quantitative',
        'axis': {'minExtent': 30}
      },
      'color': {
        'condition': {
          'selection': 'brush',
          'field': 'Origin',
          'type': 'nominal'
        },
        'value': 'grey'
      }
    }
  }
};
