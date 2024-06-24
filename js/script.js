document.addEventListener('DOMContentLoaded', function() {
    const parallaxItems = document.querySelectorAll('.parallax-item');

    function checkVisibility() {
        const windowHeight = window.innerHeight;
        parallaxItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                item.classList.add('parallax-visible');
            } else {
                item.classList.remove('parallax-visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // 초기 로딩 시 체크
});
