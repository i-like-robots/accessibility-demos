function Expandable(element) {
    this.target = element;
    this.summary = element.querySelector('.expandable-summary');
    this.content = element.querySelector('.expandable-content');

    this.isOpen === undefined && this.init(
        element.classList.contains('is-open') || window.location.hash == this.content.id
    );
}

Expandable.prototype.init = function(open) {
    this.isOpen = open;

    if (!this.isOpen) {
        this.target.classList.add('is-closed');
        this.content.style.display = 'none';
    }

    this.summary.addEventListener('click', this.toggle.bind(this), false);
    this.summary.setAttribute('aria-expanded', this.isOpen);
    this.summary.setAttribute('aria-owns', this.content.id);
};

Expandable.prototype.toggle = function() {
    var classNames = [ 'is-closed', 'is-open' ];
    var newClass = classNames[+!this.isOpen];
    var oldClass = classNames[+this.isOpen];

    this.isOpen = !this.isOpen;

    this.target.classList.add(newClass);
    this.target.classList.remove(oldClass);
    this.summary.setAttribute('aria-expanded', this.isOpen);
    this.content.style.display = this.isOpen ? '' : 'none';
};
