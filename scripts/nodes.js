let nodes = [];

function connect(origin, target) {
  if (target instanceof ConstantSource) {
    throw new Error('OperatorError: Cannot connect a node to a ConstantSource');
    
  } else if (target instanceof Oscillator) {
    throw new Error('OperatorError: Cannot connect a node to an Oscillator');
    
  } else if (target instanceof Destination) {
    if (origin.outwardConnections.indexOf(0) !== -1) throw new Error('OperatorError: Node is already connected to the audioContext.destination');
    // else...
    origin.node.connect(audioContext.destination);
    origin.outwardConnections.push(0);
    target.inwardConnections.push(origin.id);
    return;
    
  } else if (target instanceof Parameter) {
    if (origin.outwardConnections.indexOf(target.id) !== -1) return;
    // else...
    origin.node.connect(target.param);
    origin.outwardConnections.push(target.id);
    target.inwardConnections.push(origin.id);
    return;
    
  } else {
    if (origin.outwardConnections.indexOf(target.id) !== -1) return;
    // else...
    origin.node.connect(target.node);
    origin.outwardConnections.push(target.id);
    target.inwardConnections.push(origin.id);
    return;
  }
}

class Destination {
  constructor() {
    this.id = 0;
    this.node = audioContext.destination;
    this.inwardConnections = [];
    nodes.push(this);
  };
};
class Parameter {
  constructor(parent, param) {
    this.param = param;
    this.id = parent.params.length + (parent.id * 1000);
    this.inwardConnections = [];
    parent.params.push(this);
  };
};


class Analyser {
  constructor(x, y) {
    confirmExit = true;
    this.node = new AnalyserNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.bounds = [x-80, y-50, 160, 100];
    // in X, Y, width, height form to make clearRect() easier
    this.center = [x, y]
    this.color = '#FF0000';
    nodes.push(this);
  };
};
class BiquadFilter {
  constructor(x, y) {
    confirmExit = true;
    this.node = new BiquadFilterNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.frequency);
    new Parameter(this, this.node.detune);
    new Parameter(this, this.node.Q);
    new Parameter(this, this.node.gain);
    this.bounds = [x-155, y-70, 310, 140];
    this.innerBounds = [x-125, y-50, 250, 100];
    this.center = [x, y];
    this.color = '#FF9200';
    nodes.push(this);
  };
}
class ConstantSource {
  constructor(x, y) {
    confirmExit = true;
    this.node = new ConstantSourceNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.offset);
    this.bounds = [x, y, undefined, undefined];
    this.color = '#FFD300';
    nodes.push(this);
  };
}
class Delay {
  constructor(x, y) {
    confirmExit = true;
    this.node = new DelayNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.delayTime);
    this.bounds = [x, y, undefined, undefined];
    this.color = '#66A302';
    nodes.push(this);
  };
}
class DynamicsCompressor {
  constructor(x, y) {
    confirmExit = true;
    this.node = new DynamicsCompressorNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.threshold);
    new Parameter(this, this.node.knee);
    new Parameter(this, this.node.ratio);
    new Parameter(this, this.node.attack);
    new Parameter(this, this.node.release);
    this.bounds = [x, y, undefined, undefined];
    this.color = '#00FD00';
    nodes.push(this);
  };
}
class Gain {
  constructor(x, y) {
    confirmExit = true;
    this.node = new GainNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.gain);
    this.bounds = [x, y, undefined, undefined];
    this.color = '#0288FB';
    nodes.push(this);
  };
}
class Oscillator {
  constructor(x, y) {
    confirmExit = true;
    this.node = new OscillatorNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.frequency);
    new Parameter(this, this.node.detune);
    this.bounds = [x, y, undefined, undefined];
    this.color = '#3E03FB';
    nodes.push(this);
  };
}
class StereoPanner {
  constructor(x, y) {
    confirmExit = true;
    this.node = new StereoPannerNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.pan);
    this.bounds = [x, y, undefined, undefined];
    this.color = '#FB00FB';
    nodes.push(this);
  };
}

const kNodeConstructorList = [
  Analyser, BiquadFilter, ConstantSource, Delay, DynamicsCompressor, Gain, Oscillator, StereoPanner
]