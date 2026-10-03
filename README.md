# illixion.com

My personal website: a static page on Cloudflare Pages, no framework and no build step. It
installs as a web app (`site.webmanifest` + `sw.js`) and is split into tabs by `#hash`:
Home, Apps, Projects, Art and Keys. Without JavaScript every tab shows, one after another.

- `index.html` holds all five tabs. `js/index.js` switches them, loads recent posts from the
  blog's `searchindex.json`, and adds an Install link to each app that
  [apps.illixion.com/source.json](https://apps.illixion.com/source.json) ships.
- `sw.js` is network-first with a cache fallback. Bump `VERSION` when its shell list changes.
- `_headers` sets a strict CSP (no inline scripts or styles). Cloudflare Web Analytics is
  allowed in it; turn it on in the Pages project's settings, which injects the beacon.

## Keys

`pgp.txt` is the PGP key, shown on the Keys tab. It is also published by Web Key Directory, so
`gpg --locate-keys illixion@illixion.com` finds it. After changing the key, regenerate:

```sh
gpg --show-keys --with-wkd-hash pgp.txt   # the hash after the uid, before @illixion.com
gpg --dearmor < pgp.txt > .well-known/openpgpkey/hu/<hash>
```

My end-to-end-signed SSH `authorized_keys` distribution lives in its own repo and is served
from GitHub Pages: <https://github.com/illixion/illixion.github.io>, <https://ssh.illixion.com>.
`/ssh` on this site redirects there. `/ssh.keys` redirects to its `keys.list` for old
`curl`-based clients and is being retired.
