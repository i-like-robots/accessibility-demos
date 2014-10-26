function Modal(element) {
    this.target = element;

    this.isOpen === undefined && this.init();
}

Modal.prototype.init = function() {
    this.modalOverlay = document.createElement('div');
    this.modalOverlay.className = 'modal-overlay';

    this.modalWindow = document.createElement('div');
    this.modalWindow.className = 'modal';

    this.modalWrapper = document.createElement('div');
    this.modalWrapper.className = 'modal-wrapper';

    this.modalContent = document.createElement('div');
    this.modalContent.className = 'modal-content';

    this.closeButton = document.createElement('button');
    this.closeButton.className = 'modal-close';
    this.closeButton.innerHTML = 'Close';
    this.closeButton.type = 'button';

    this.closeButton.onclick = this.close.bind(this);

    this.modalWindow.appendChild(this.modalWrapper);
    this.modalWrapper.appendChild(this.modalContent);
    this.modalWindow.appendChild(this.closeButton);

    this.isOpen = false;
};

Modal.prototype.open = function(content) {
    if (this.isOpen) return;

    this.modalContent.innerHTML = content;

    this.target.appendChild(this.modalOverlay);
    this.target.appendChild(this.modalWindow);

    this.isOpen = true;
};

Modal.prototype.close = function() {
    this.target.removeChild(this.modalOverlay);
    this.target.removeChild(this.modalWindow);

    this.isOpen = false;
};
