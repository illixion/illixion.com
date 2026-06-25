# illixion.com

My personal website — a static site (hosted on Cloudflare Pages) with an about
page, art gallery, and links to my projects and socials.

## SSH key sync

My end-to-end-signed SSH `authorized_keys` distribution system lives in its own
repo and is served from GitHub Pages (its binary payload is too large for
Cloudflare Pages):

- Repo: <https://github.com/illixion/illixion.github.io>
- Site: <https://illixion.github.io>

`/ssh` on this site redirects there. The legacy plain key list at
[`/ssh.keys`](ssh.keys) is kept only for old `curl`-based clients and is being
retired.
