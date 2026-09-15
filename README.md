# PES Footscray — Patient Entertainment System

**[Open the public interactive demo](https://pesfootscray-ryan-demo.pdadp999.chatgpt.site)**

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

The live demo is public. This repository remains private; recruiters need the demo link or separately granted repository access to view the code.

