function Modal(element) {
    this.target = element;

    this.isOpen === undefined && this.init();
}

Modal.prototype.init = function() {
    this.modalOverlay = document.createElement('div');
    this.modalOverlay.className = 'modal-overlay';

    this.modalWindow = document.createElement('div');
    this.modalWindow.setAttribute('role', 'dialog');
    this.modalWindow.setAttribute('tabindex', '0');
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

    this.escapeHandler = function(e) {
        if (e.keyCode === 27) this.close();
    }.bind(this);

    this.focusHandler = function(e) {
        var target = e.relatedTarget || e.target;

        if (!this.modalWindow.contains(target)) {
            e.preventDefault();
            this.modalWindow.focus();
        }
    }.bind(this);

    this.modalWindow.appendChild(this.modalWrapper);
    this.modalWrapper.appendChild(this.modalContent);
    this.modalWindow.appendChild(this.closeButton);

    this.isOpen = false;
};

Modal.prototype.open = function(content, title) {
    if (this.isOpen) return;

    this.trigger = document.activeElement;

    this.modalWindow.setAttribute('aria-label', title);

    this.modalContent.innerHTML = content;

    this.target.appendChild(this.modalOverlay);
    this.target.appendChild(this.modalWindow);

    this.modalWindow.focus();

    window.addEventListener('keyup', this.escapeHandler, false);
    // Firefox doesn't support focusin or focusout
    // https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    window.addEventListener('focusin', this.focusHandler, false);
    window.addEventListener('focusout', this.focusHandler, false);

    this.isOpen = true;
};

Modal.prototype.close = function() {
    this.target.removeChild(this.modalOverlay);
    this.target.removeChild(this.modalWindow);

    window.removeEventListener('keyup', this.escapeHandler, false);
    window.removeEventListener('focusin', this.focusHandler, false);
    window.removeEventListener('focusout', this.focusHandler, false);

    this.trigger.focus();

    this.isOpen = false;
};
