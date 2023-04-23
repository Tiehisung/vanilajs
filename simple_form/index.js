/**Doc:
 * Temporal storage for a pet at registration instance.
 */

let pet = {};

function RegisterFn() {
  pet.name = document.getElementById("pet-name").value;
  pet.age = document.getElementById("pet-age").value;
  pet.type = document.getElementById("pet-type").value;
  pet.owner = document.getElementById("owner").value;
  pet.color = document.getElementById("pet-color").value;
  pet.sex = document.getElementById("pet-sex").value;

  console.log("pet object", pet);

  let screen = document.getElementById("screen-ta");
  screen.append("Pet data\n".toUpperCase());

  for (let x = 0; x < Object.keys(pet).length; x++) {
    screen.append(Object.keys(pet)[x] + " ==>" + Object.values(pet)[x] + "\n");
  }

  //   document.getElementById("screen-ta").value = "Registration successful";
  document.getElementById("screen-ta").style.color = "green";
  document.getElementById("screen-ta").style.fontWeight = "800";
  document.getElementById("screen-ta").style.border = "solid 1px green";
}

function RecallFn() {
  let screenEl = document.getElementById("screen-ta");
  screenEl.value = "Recall";
}

const ResetForm = () => {
  document.getElementById("screen-ta").value = "";
  document.getElementById("pet-name").value = "";
  document.getElementById("pet-age").value = "";
  document.getElementById("pet-color").value = "";
  document.getElementById("owner").value = "";
  document.getElementById("pet-type").value = "";
  document.getElementById("pet-sex").value = "";
};
