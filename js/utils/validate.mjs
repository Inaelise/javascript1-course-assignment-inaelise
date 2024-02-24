export function validate() {
  const selectSize = document.getElementById("size-selector").value;
  const selectColor = document.getElementById("color-selector").value;
  if (selectSize === "" && selectColor === "") {
    alert("Please select a color and size");
    return false;
  } else if (selectSize === "") {
    alert("Please select a size");
    return false;
  }
  if (selectColor === "") {
    alert("Please select a color");
    return false;
  }
}
