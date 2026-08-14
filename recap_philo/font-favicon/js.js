// Share helper: tries Web Share API, falls back to clipboard copy.
(function () {
    function sharePage(e) {
        e.preventDefault();
        const url = window.location.href;
        const title = document.title || 'Lien';
        if (navigator.share) {
            navigator.share({ title: title, url: url }).catch(function (err) {
                console.warn('Web Share failed:', err);
            });
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function () {
                alert('Lien copié dans le presse-papiers.');
            }, function () {
                fallbackCopyText(url);
            });
        } else {
            fallbackCopyText(url);
        }
    }

    function fallbackCopyText(text) {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Lien copié dans le presse-papiers.');
        } catch (err) {
            alert('Impossible de copier le lien automatiquement. Voici le lien:\n' + text);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var btn = document.getElementById('shareBtn');
        if (btn) btn.addEventListener('click', sharePage);
    });
})();

// Wrap tables dynamically
(function () {
    function wrapTables() {
        const tables = document.querySelectorAll('table:not(.wrapped)');
        tables.forEach(function (table) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper';
            table.classList.add('wrapped');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    document.addEventListener('DOMContentLoaded', wrapTables);
})();
