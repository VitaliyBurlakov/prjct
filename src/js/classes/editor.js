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

    this._onFileChange = this._onFileChange.bind(this);

    this._bindEvents();
    console.log(this);
  }

  applyFilter(filter) {
    if (!(filter in this.caman)) {
      console.log(`There is no filter with name "${filter}"`);
      return;
    }

    if (this.filter === filter || this._processing) {
      return;
    }

    this._processing = true;
    this._toggleBusyState();
    this.caman.revert();
    this.caman[filter]();
    this.caman.render(() => {
      this._processing = false;
      this._toggleBusyState();
      this.filter = filter;
      this._highlightActiveFilter();
    });
  }

  resetFilter() {}

  save() {}

  _bindEvents() {
    this.fileInput.addEventListener('change', this._onFileChange);
  }

  _onFileChange(e) {
    this.file = this.fileInput.files[0];
    this._initEditor();
  }

  _onFilterChange() {}

  _onUploadProgress() {}

  _highlightActiveFilter() {}

  _toggleBusyState() {
    const { busyClass } = this.props;
    const isBusy   = this.root.classList.contains(busyClass);
    const triggers = [this.triggerReset, this.triggerUpload];
    const method   = isBusy ? 'removeAttribute' : 'setAttribute';

    this.root.classList.toggle(busyClass);
    triggers.forEach(el => el[method]('disabled', true));
  }

  _toggleUploadingState() {
    this.root.classList.toggle(this.props.uploadingClass);
  }

  _initEditor() {
    const { hasImageClass, imageMaxSize } = this.props;
    const canvas = document.createElement('canvas');
    const url = URL.createObjectURL(this.file);

    if (this.canvas) {
      this.canvas.parentNode.replaceChild(canvas, this.canvas);
    } else {
      this.canvasContainer.appendChild(canvas);
    }

    this.canvas = canvas;
    this._toggleBusyState();
    this.caman = Caman(this.canvas, url, (caman) => {
      const { originalWidth, originalHeight } = caman;
      const ratio = originalWidth / originalHeight;
      const width = originalWidth > imageMaxSize
        ? imageMaxSize
        : originalWidth;
      const height = Math.round(width / ratio);

      caman.resize({ width, height }).render();

      this._toggleBusyState();
      this.root.classList.add(hasImageClass);
    });
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
