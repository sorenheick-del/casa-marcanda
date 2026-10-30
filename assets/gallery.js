(function () {
  var grid = document.getElementById('grid');
  if (!grid) return;
  var base = grid.getAttribute('data-base');
  var ids = [55,56,61,62,63,22,16,18,48,49,50,51,52,53,87,88,54,89,90,20,25,57,58,59,60,78,79,91,26,27,24,28,29,80,81,82,83,84,35,36,37,38,39,23,41,42,43,44,33,34];
  var captions = window.CAPTIONS || [];
  var lb = document.getElementById('lb');
  var img = document.getElementById('lb-img');
  var cap = document.getElementById('lb-cap');
  var openLabel = grid.getAttribute('data-open');
  var cur = 0;

  function show(i) {
    cur = (i + ids.length) % ids.length;
    img.src = base + ids[cur] + '.jpg';
    img.alt = captions[cur] || '';
    cap.textContent = captions[cur] || '';
  }

  ids.forEach(function (id, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', openLabel + (captions[i] || ''));
    var t = document.createElement('img');
    t.src = base + id + '.jpg';
    t.alt = captions[i] || '';
    t.loading = 'lazy';
    b.appendChild(t);
    b.addEventListener('click', function () { show(i); lb.showModal(); });
    grid.appendChild(b);
  });

  document.getElementById('lb-prev').onclick = function () { show(cur - 1); };
  document.getElementById('lb-next').onclick = function () { show(cur + 1); };
  document.getElementById('lb-close').onclick = function () { lb.close(); };
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();
