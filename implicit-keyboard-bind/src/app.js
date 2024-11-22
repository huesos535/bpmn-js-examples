import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import './style.css';

import $ from 'jquery';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import diagramXML from '../resources/newDiagram.bpmn';


var modelerLeft = new BpmnModeler({
  container: '#js-canvas-left',
});

var modelerRight = new BpmnModeler({
  container: '#js-canvas-right',
});


async function openDiagram(xml) {
  try {
    await modelerLeft.importXML(xml);
    await modelerRight.importXML(xml);
  } catch (err) {
    console.error(err);
  }
}

function customSelectAll() {
  var range = document.createRange();
  var selection = window.getSelection();

  range.selectNodeContents(document.querySelector('#js-selectable-text'));
  selection.removeAllRanges();
  selection.addRange(range);
}

$(function() {
  openDiagram(diagramXML);

  document.getElementById('js-selectable').addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
      event.preventDefault();
      customSelectAll();
    }
  });
});

