// Smooth scroll fallback for browsers that ignore CSS scroll-behavior
document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (!href || href === '#') return;
            var targetSection = document.querySelector(href);
            if (!targetSection) return;
            e.preventDefault();

            var header = document.querySelector('.site-header');
            var headerHeight = header ? header.offsetHeight : 80;

            var targetPosition = targetSection.offsetTop - headerHeight;
            var startPosition = window.pageYOffset;
            var distance = targetPosition - startPosition;
            var duration = 800;
            var start = null;

            function easeInOutQuad(t) {
                return t < 0.5
                    ? 2 * t * t
                    : 1 - Math.pow(-2 * t + 2, 2) / 2;
            }

            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = timestamp - start;
                var percentage = Math.min(progress / duration, 1);
                var eased = easeInOutQuad(percentage);
                var currentPosition = startPosition + distance * eased;
                window.scrollTo(0, currentPosition);
                if (percentage < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });
    });
});


