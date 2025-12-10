(function () {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href').slice(1);
                var target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, '', '#' + targetId);
                }
            });
        });

        var back = document.createElement('button');
        back.id = 'back-to-top';
        back.setAttribute('aria-label', 'Volver arriba');
        back.textContent = '↑';
        Object.assign(back.style, {
            position: 'fixed',
            right: '16px',
            bottom: '16px',
            width: '44px',
            height: '44px',
            borderRadius: '6px',
            border: 'none',
            background: '#333',
            color: '#fff',
            cursor: 'pointer',
            display: 'none',
            zIndex: 9999
        });
        document.body.appendChild(back);
        back.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('scroll', function () {
            back.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        var theme = localStorage.getItem('theme') || 'light';
        function applyTheme(t) {
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem('theme', t);
        }
        applyTheme(theme);

        var toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Alternar tema');
        toggle.textContent = theme === 'dark' ? '🌙' : '☀️';
        Object.assign(toggle.style, {
            position: 'fixed',
            right: '16px',
            bottom: '72px',
            width: '44px',
            height: '44px',
            borderRadius: '6px',
            border: 'none',
            background: '#fff',
            color: '#000',
            cursor: 'pointer',
            zIndex: 9999
        });
        document.body.appendChild(toggle);
        toggle.addEventListener('click', function () {
            var next = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            toggle.textContent = next === 'dark' ? '🌙' : '☀️';
        });

        var fh = document.getElementById('fecha-hora');
        if (fh) {
            function updateFechaHora() {
                var d = new Date();
                fh.textContent = d.toLocaleString();
            }
            updateFechaHora();
            setInterval(updateFechaHora, 60 * 1000);
        }
    });
})();