# PES Footscray — Patient Entertainment System

**Live demo:** Render deployment pending. The public URL will be added after deployment is verified.

A hospital bedside entertainment interface by **Ryan Pathirana**, with a browser-adapted portfolio demo that visitors can explore without an account or specialised TV hardware.

## Try the demo

- Navigate Entertainment, Hospital Info, My Care and Clinical Services.
- Select sample TV channels and movie previews; play, pause and change the generated animation.
- Play local sample audio tones and adjust volume.
- Walk through simulated casting and HDMI connection flows.
- Complete a sample survey and discharge checklist.
- Use mouse, touch, Tab, arrow keys, Enter and Escape.

## Original project and browser demo

The original application uses HTML, CSS and JavaScript with API-driven menus and JAPIT/WIXP TV integration. Its source remains at the repository root.

The public demo uses the original dashboard layout and selected image assets, with a browser-only adapter in `portfolio-demo/`. TV tuning, radio broadcasts, casting and HDMI are explicitly simulated. Preview animation and audio are generated locally; information pages use sample content. The demo does not connect to hospital APIs, submit care requests, collect patient data or persist survey answers. It is not an official hospital website.

## Run locally

Original dashboard (requires its intended integrations for full functionality):

```sh
python server.py
```

Browser portfolio demo:

```sh
python -m http.server 8080 --directory portfolio-demo
```

Then open http://localhost:8080.

## Validation

- JavaScript syntax checked with `node --check portfolio-demo/demo.js`.
- All referenced local assets verified; no external page dependencies or hospital API calls in the demo adapter.
- Browser rendering and automated end-to-end tests have not been completed in the publishing environment.

## Portfolio access

This repository remains private. Once the Render deployment is verified, share its public URL with recruiters; access to the source code requires separately granted repository access.


## Deploy on Render

The root `render.yaml` configures a static site that publishes only `portfolio-demo/`.

Create a Blueprint from this repository in the Render account connected to GitHub. For manual static-site setup, use:

| Setting | Value |
| --- | --- |
| Repository | `rpath97/PesFootscray2` |
| Branch | `main` |
| Name | `pesfootscray-portfolio` |
| Root directory | Leave blank |
| Build command | `node --check portfolio-demo/demo.js` |
| Publish directory | `portfolio-demo` |

No application secrets or database are required for this browser demo. Use the actual URL returned by Render after a successful deployment; the service name alone does not guarantee a particular hostname.

Configuration reference: [Render Blueprint documentation](https://render.com/docs/blueprint-spec).
