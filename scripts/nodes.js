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
  };};
//
class Parameter {
  constructor(parent, param) {
    this.param = param;
    this.id = parent.params.length + (parent.id * 1000);
    this.inwardConnections = [];
    parent.params.push(this);
  };
  };
//
class Analyser {
  constructor() {
    this.node = new AnalyserNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    nodes.push(this);
  };
 };
//

class BiquadFilter {
  constructor() {
    this.node = new BiquadFilterNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.frequency);
    new Parameter(this, this.node.detune);
    new Parameter(this, this.node.Q);
    new Parameter(this, this.node.gain);
    nodes.push(this);
  };
  }
//

class ConstantSource {
  constructor() {
    this.node = new ConstantSourceNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.offset);
    nodes.push(this);
  };
  }
//

class Delay {
  constructor() {
    this.node = new DelayNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.delayTime);
    nodes.push(this);
  };
}


class DynamicsCompressor {
  constructor() {
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
    nodes.push(this);
  };
}


class Gain {
  constructor() {
    this.node = new GainNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.gain);
    nodes.push(this);
  };
}


class Oscillator {
  constructor() {
    this.node = new OscillatorNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.frequency);
    new Parameter(this, this.node.detune);
    nodes.push(this);
  };
}


class StereoPanner {
  constructor() {
    this.node = new StereoPannerNode(audioContext);
    this.id = nodes.length;
    this.inwardConnections = [];
    this.outwardConnections = [];
    this.params = [];
    new Parameter(this, this.node.pan);
    nodes.push(this);
  };
}

