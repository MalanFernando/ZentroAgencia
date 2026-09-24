/**
 * ¿Están activas las animaciones? Lo decide el script inicial del layout con
 * html[data-motion]. Si ese atributo se perdió (por ejemplo, si React tuvo que
 * rehacer el documento porque una extensión o el hosting inyectó nodos), se
 * vuelve a calcular aquí para que las animaciones no queden apagadas.
 */
export function motionEnabled(): boolean {
  const root = document.documentElement;
  if (!root.dataset.motion) {
    root.dataset.motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "off" : "on";
  }
  return root.dataset.motion === "on";
}
