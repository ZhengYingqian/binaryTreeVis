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

export const test = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "description": "A bar chart with highlighting on hover and selecting on click. (Inspired by Tableau's interaction style.)",
  "data": {
    "values": [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ]
  },
  "selection": {
    "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
    "select": {"type": "multi"}
  },
  "mark": {
    "type": "bar",
    "fill": "#4C78A8",
    "stroke": "black",
    "cursor": "pointer"
  },
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"},
    "fillOpacity": {
      "condition": {"selection": "select", "value": 1},
      "value": 0.3
    },
    "strokeWidth": {
      "condition": [
        {
          "test": {
            "and": [
              {"selection": "select"},
              "length(data(\"select_store\"))"
            ]
          },
          "value": 2
        },
        {"selection": "highlight", "value": 1}
      ],
      "value": 0
    }
  },
  "config": {
    "scale": {
      "bandPaddingInner": 0.2
    }
  }
}
