# SAP Practice Simulator

A lightweight, dependency-free SAP GUI simulator for practicing common SAP ERP workflows. It uses fictional data and runs entirely in the browser; it does not connect to a real SAP system.

## Run locally

Open `index.html` in a browser, or serve the repository with any static file server:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Practice interactions

- Enter `ME23N`, `MM03`, `VA03`, or `MIGO` in the command bar and press **Run**.
- Use the sidebar to switch between ERP workspaces.
- Start the guided procure-to-pay scenario from the banner.
