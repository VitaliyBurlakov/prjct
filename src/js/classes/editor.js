class Editor {
  constructor(el, props) {
    this.root             = isDomElement(el) ? el : qs(el);
    this.props            = Object.assign({}, Editor.defaults, props);
    this.canvasContainer  = qs(this.props.canvasContainer, this.root);
    this.filtersContainer = qs(this.props.filtersContainer, this.root);
    this.fileInput        = qs(this.props.fileInput, this.root);
    this.triggerReset     = qs(this.props.triggerReset, this.root);
    this.triggerUpload    = qs(this.props.triggerUpload, this.root);
    this.progressBar      = qs(this.props.progressBar, this.root);
    this.caption          = qs(this.props.caption, this.root);
    this.file             = null;
    this.filter           = null;
    this._processing      = false;
    console.log(this);
  }
}

Editor.defaults = {
  activeClass: 'is-active',
  busyClass: 'is-busy',
  hasImageClass: 'has-image',
  uploadingClass: 'is-uploading',
  filtersContainer: '.editor__presets',
  canvasContainer: '.editor__canvas-container',
  triggerReset: '.editor__reset',
  triggerUpload: '.editor__upload',
  fileInput: 'input[type="file"]',
  progressBar: '.editor__progress .progress-bar',
  caption: '.editor__caption textarea',
  imageMaxSize: 1200,
  onSave: noop,
  onError: noop
};

Editor.FILTERS = [
  'vintage',
  'lomo',
  'clarity',
  'sinCity',
  'sunrise',
  'crossProcess',
  'orangePeel',
  'love',
  'grungy',
  'jarques',
  'pinhole',
  'oldBoot',
  'glowingSun',
  'hazyDays',
  'herMajesty',
  'nostalgia',
  'hemingway',
  'concentrate'
];
