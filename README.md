# monitor-jupyter-notebook

Puts an icon in the toolbar which displays the status of the tracked jupyter
notebook. Click on the icon to set the tracked notebook to the current page.

Turn off by setting the tracked page to url that doesn't contain `.ipynb`.

You can change the interval for monitoring by changing the line
`setInterval(watchdog, 1000);` in `background.js` (checks the tracked notebook
every second by default).