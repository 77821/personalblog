export function setRem() {
  function calc() {
    const scale = document.documentElement.clientWidth / 1920;
    document.documentElement.style.fontSize = scale * 100 + "px";
  }
  calc();
  window.addEventListener("resize", calc);
}
