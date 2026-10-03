// Tabs, blog posts, app install links, art lightbox, key copy, and the nose.
// Loaded with `defer`, so the DOM is ready when this runs.

document.documentElement.classList.add('js');

// ---------------------------------------------------------------- tabs

const TABS = ['home', 'apps', 'projects', 'arts', 'keys'];
const TITLES = { home: 'Ixion', apps: 'Apps', projects: 'Projects', arts: 'Art', keys: 'Keys' };

const bar = document.querySelector('.tabbar');
const indicator = document.createElement('span');
indicator.className = 'indicator';
indicator.setAttribute('aria-hidden', 'true');
bar.prepend(indicator);

// The highlight behind the current tab slides to the new one (CSS transitions the transform).
function moveIndicator() {
  const a = bar.querySelector('[aria-current="page"]');
  if (!a) return;
  indicator.style.width = `${a.offsetWidth}px`;
  indicator.style.height = `${a.offsetHeight}px`;
  indicator.style.transform = `translate(${a.offsetLeft}px, ${a.offsetTop}px)`;
}

let current = null;

function showTab(id) {
  if (!TABS.includes(id)) id = 'home';
  if (id === current) return;
  const dir = current && TABS.indexOf(id) < TABS.indexOf(current) ? -1 : 1;
  const first = current === null;
  current = id;

  document.querySelectorAll('.tab').forEach((s) => {
    const on = s.id === id;
    s.classList.toggle('active', on);
    s.classList.remove('enter');
    if (on && !first) {
      // The new tab's panels slide in from the side the tab sits on, one after another.
      s.style.setProperty('--dir', dir);
      [...s.children].forEach((c, i) => c.style.setProperty('--i', Math.min(i, 5)));
      void s.offsetWidth; // restart the animation if this tab was shown before
      s.classList.add('enter');
    }
  });
  document.querySelectorAll('.tabbar a').forEach((a) => {
    if (a.dataset.tab === id) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  moveIndicator();
  document.title = id === 'home' ? 'Ixion' : `${TITLES[id]} | Ixion`;
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', () => showTab(location.hash.slice(1)));
window.addEventListener('resize', moveIndicator);
showTab(location.hash.slice(1));
// Turn the indicator's transition on only after it has been placed, so it doesn't fly in on load.
requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.add('ready')));

// ---------------------------------------------------------------- blog posts

const postList = document.getElementById('blog-post-list');

function plainText(htmlish) {
  return new DOMParser().parseFromString(htmlish || '', 'text/html').body.textContent.trim();
}

const morePosts = document.getElementById('more-posts');
const PAGE = 4;
let allPosts = [];

function postItem(post) {
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const a = document.createElement('a');
  a.href = post.uri;
  a.textContent = plainText(post.title);
  h3.append(a);
  const p = document.createElement('p');
  p.textContent = plainText(post.summary);
  li.append(h3, p);
  return li;
}

function showMorePosts() {
  const shown = postList.querySelectorAll('li:not(.placeholder)').length;
  postList.querySelectorAll('.placeholder').forEach((li) => li.remove());
  postList.append(...allPosts.slice(shown, shown + PAGE).map(postItem));
  morePosts.hidden = shown + PAGE >= allPosts.length;
}

morePosts.addEventListener('click', showMorePosts);

fetch('https://blog.illixion.com/searchindex.json')
  .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
  .then((data) => {
    allPosts = data.posts || [];
    showMorePosts();
  })
  .catch(() => {
    const li = document.createElement('li');
    li.className = 'muted';
    li.textContent = "Couldn't load the latest posts. They're all on the blog.";
    postList.replaceChildren(li);
  });

// ---------------------------------------------------------------- app install links

// An Install link appears only for apps the AltStore source actually ships.
fetch('https://apps.illixion.com/source.json')
  .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
  .then((source) => {
    for (const app of source.apps || []) {
      const row = document.querySelector(`.app[data-bundle="${CSS.escape(app.bundleIdentifier)}"]`);
      if (!row) continue;
      const links = row.querySelector('.row-links');
      const a = document.createElement('a');
      a.className = 'pill primary';
      a.href = 'https://apps.illixion.com/';
      a.textContent = 'Install on iPhone or iPad';
      const v = document.createElement('span');
      v.className = 'version';
      v.textContent = `Version ${app.version}`;
      links.prepend(a);
      links.append(v);
    }
  })
  .catch(() => {});

// ---------------------------------------------------------------- lightbox

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('[data-lightbox]').forEach((link) => {
  link.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const thumb = link.querySelector('img');
    lightboxImg.src = link.getAttribute('href');
    lightboxImg.alt = thumb ? thumb.alt : link.textContent;
    lightbox.showModal();
  });
});

lightbox.querySelector('.close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => { lightboxImg.removeAttribute('src'); });

// ---------------------------------------------------------------- copy key

document.querySelectorAll('[data-copy-from]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = document.getElementById(btn.dataset.copyFrom).textContent;
    const label = btn.textContent;
    try {
      await navigator.clipboard.writeText(text + '\n');
      btn.textContent = 'Copied';
    } catch {
      btn.textContent = 'Copy failed';
    }
    setTimeout(() => { btn.textContent = label; }, 1600);
  });
});

// ---------------------------------------------------------------- the nose

const boop = new Audio('audio/partyfavorraspypart_ac01_3.mp3');
document.querySelector('.nose').addEventListener('click', () => {
  boop.cloneNode().play();
});

// ---------------------------------------------------------------- offline

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
