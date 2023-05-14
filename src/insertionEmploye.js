import React, { useState } from "react";

function InsertionEmploye({ onEquipementSelect }) {
  //Déclaration de variables
  const [dateArrivee, setDateArrivee] = useState("");
  const [role, setRole] = useState("");
  const [ordinateur, setOrdinateur] = useState("");
  const [station, setStation] = useState("");
  const [ecranSupp, setEcranSupp] = useState("");
  const [telephone, setTelephone] = useState("");
  const [casque, setCasque] = useState("");

  //Déclaration des handle
  const handleDate = (event) => {
    setDateArrivee(event.target.value);
  };
  const handleRole = (event) => {
    setRole(event.target.value);
  };
  const handleOrdinateur = (event) => {
    setOrdinateur(event.target.value);
  };

  const handleStation = (event) => {
    setStation(!station);
  };
  const handleEcranSupp = (event) => {
    setEcranSupp(parseInt(event.target.value));
  };
  const handleTelephone = (event) => {
    setTelephone(event.target.value);
  };
  const handleCasque = (event) => {
    setCasque(!casque);
  };

  //Gère l'envoi du formulaire.
  const handleFormSubmit = (event) => {
    event.preventDefault();

    //Contrôle de conformité du formulaire
    if (!dateArrivee || !role || !ordinateur) {
      alert("Veuillez remplir tous les champs");
      return;
    } else {
      if (role === "Commercial" && !telephone) {
        alert("Veuillez remplir tous les champs");
        return;
      }
    }

    //Si le budget est négatif et que le rôle n'est pas trader, on alerte l'utilisateur
    if (calculBudget() < 0 && role !== "Trader") {
      alert("Le budget est négatif");
      return;
    } else {
      alert("Le formulaire est bien envoyé");
    }

    //Stocke les informations du formulaire
    const equipementSelectionne = {
      dateArrivee,
      role,
      ordinateur,
      station,
      ecranSupp,
      telephone,
      casque,
    };

    console.log(equipementSelectionne);

    onEquipementSelect(equipementSelectionne);
  };

  const calculBudget = () => {
    let budget = 0;

    switch (role) {
      case "Commercial":
        budget = 3000;
        break;
      case "Trader":
        budget = -1;
        break;
      case "Développeur":
        budget = 3000;
        break;
      default:
        break;
    }

    switch (ordinateur) {
      case "PC portable":
        budget -= 1800;
        break;
      case "PC Fixe avec moniteur":
        budget -= 2200;
        break;
      default:
        break;
    }

    if (station) {
      budget -= 400;
    }

    budget -= ecranSupp * 250;

    switch (telephone) {
      case "Smartphone":
        budget -= 600;
        break;
      case "Téléphone fixe":
        budget -= 100;
        break;
      default:
        break;
    }

    if (casque) {
      budget -= 250;
    }

    return budget;
  };

  return (
    <div class="p-5 bg-white border-2 border-black rounded-lg">
      <h2 class="mb-10 p-5 text-xl font-bold border-2 border-black bg-white rounded-lg">
        Composez l'espace de travail du nouvel arrivant
      </h2>
      <form onSubmit={handleFormSubmit}>
        <h3 class="font-bold">
          Date d'arrivée :
          <input
            class="font-normal ml-2 border-2 border-black rounded-lg p-1"
            type="date"
            value={dateArrivee}
            onChange={handleDate}
          />
        </h3>
        <h3 class="font-bold">Rôle :</h3>
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="Commercial"
              checked={role === "Commercial"}
              onChange={handleRole}
              class="mx-2 accent-yellow-400"
            />
            Commercial
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Trader"
              checked={role === "Trader"}
              onChange={handleRole}
              class="mx-2 accent-red-400"
            />
            Trader
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Développeur"
              checked={role === "Développeur"}
              onChange={handleRole}
              class="mx-2 accent-purple-400"
            />
            Développeur
          </label>
        </div>
        <h3 class="font-bold">Type d'ordinateur :</h3>
        <div>
          {role === "Commercial" ? (
            <label>
              <input
                type="radio"
                name="ordinateur"
                value="PC portable"
                checked={ordinateur === "PC portable"}
                onChange={handleOrdinateur}
                class="mx-2"
              />
              PC portable
            </label>
          ) : role === "Trader" ? (
            <label>
              <input
                type="radio"
                name="ordinateur"
                value="PC Fixe avec moniteur"
                checked={ordinateur === "PC Fixe avec moniteur"}
                onChange={handleOrdinateur}
                class="mx-2"
              />
              PC Fixe avec moniteur
            </label>
          ) : (
            role === "Développeur" && (
              <>
                <label>
                  <input
                    type="radio"
                    name="ordinateur"
                    value="PC portable"
                    checked={ordinateur === "PC portable"}
                    onChange={handleOrdinateur}
                    class="mx-2"
                  />
                  PC portable
                </label>
                <label>
                  <input
                    type="radio"
                    name="ordinateur"
                    value="PC Fixe avec moniteur"
                    checked={ordinateur === "PC Fixe avec moniteur"}
                    onChange={handleOrdinateur}
                    class="mx-2"
                  />
                  PC Fixe avec moniteur
                </label>
              </>
            )
          )}
        </div>

        {ordinateur === "PC portable" && (
          <div>
            <h3>Station d'accueil : </h3>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={station}
                  onChange={handleStation}
                  class="mx-2"
                />
              </label>
            </div>
          </div>
        )}

        <h3>Nombre d'écrans supplémentaires : </h3>
        <div>
          {role === "Trader" ? (
            <label>
              <input
                type="radio"
                name="ecranSupp"
                value="3"
                checked={ecranSupp === 3}
                onChange={handleEcranSupp}
                class="mx-2"
              />
              3
            </label>
          ) : (
            role !== "Trader" && (
              <>
                <label>
                  <input
                    type="radio"
                    name="ecranSupp"
                    value="1"
                    checked={ecranSupp === 1}
                    onChange={handleEcranSupp}
                    class="mx-2"
                  />
                  1
                </label>
                <label>
                  <input
                    type="radio"
                    name="ecranSupp"
                    value="2"
                    checked={ecranSupp === 2}
                    onChange={handleEcranSupp}
                    class="mx-2"
                  />
                  2
                </label>
                <label>
                  <input
                    type="radio"
                    name="ecranSupp"
                    value="3"
                    checked={ecranSupp === 3}
                    onChange={handleEcranSupp}
                    class="mx-2"
                  />
                  3
                </label>
              </>
            )
          )}
        </div>

        <h3>Téléphone : </h3>
        <div>
          {role === "Commercial" ? (
            <label>
              <input
                type="radio"
                name="telephone"
                value="Smartphone"
                checked={telephone === "Smartphone"}
                onChange={handleTelephone}
                class="mx-2"
              />
              Smartphone
            </label>
          ) : (
            role !== "Commercial" && (
              <>
                <label>
                  <input
                    type="radio"
                    name="telephone"
                    value="Smartphone"
                    checked={telephone === "Smartphone"}
                    onChange={handleTelephone}
                    class="mx-2"
                  />
                  Smartphone
                </label>
                <label>
                  <input
                    type="radio"
                    name="telephone"
                    value="Telephone Fixe"
                    checked={telephone === "Telephone Fixe"}
                    onChange={handleTelephone}
                    class="mx-2"
                  />
                  Téléphone fixe
                </label>
              </>
            )
          )}
        </div>

        <h3>Casque : </h3>
        <div>
          <label>
            <input
              type="checkbox"
              checked={casque}
              onChange={handleCasque}
              class="mx-2"
            />
          </label>
        </div>
        <div class="">
          <h3 class="text-center text-2xl font-bold">
            Budget :{" "}
            {role === "Trader" ? (
              "illimité"
            ) : (
              <span
                style={{
                  color: calculBudget() < 0 ? "red" : "black",
                }}
              >
                {calculBudget()} €
              </span>
            )}
          </h3>
        </div>
        <div class="mt-5 flex items-center justify-center">
          <button
            type="submit"
            class="bg-green-800 p-2 border-2 border-black rounded-md text-white font-bold hover:bg-green-600"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

export default InsertionEmploye;
