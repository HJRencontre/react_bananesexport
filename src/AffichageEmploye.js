import React, { useState } from "react";

function AffichageEmploye({
  equipementSelectionne,
  onDeleteEquipement,
  onUpdateEquipement,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editedEquipement, setEditedEquipement] = useState(null);
  const [editedDateArrivee, setEditedDateArrivee] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const [editedOrdinateur, setEditedOrdinateur] = useState("");
  const [editedStation, setEditedStation] = useState(false);
  const [editedEcranSupp, setEditedEcranSupp] = useState(0);
  const [editedTelephone, setEditedTelephone] = useState("");
  const [editedCasque, setEditedCasque] = useState(false);

  //Gère la modification d'un employé
  const handleEdit = (equipement) => {
    setEditMode(true);
    setEditedEquipement(equipement);
    setEditedDateArrivee(equipement.dateArrivee);
    setEditedRole(equipement.role);
    setEditedOrdinateur(equipement.ordinateur);
    setEditedStation(equipement.station);
    setEditedEcranSupp(equipement.ecranSupp);
    setEditedTelephone(equipement.telephone);
    setEditedCasque(equipement.casque);
  };

  //Gère la suppression d'un employé
  const handleDelete = (equipement) => {
    onDeleteEquipement(equipement);
  };

  //Gère l'annulation de la modification d'un employé
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedEquipement(null);
    resetEditedValues();
  };

  //Gère l'enregistrement de la modification d'un employé
  const handleSaveEdit = () => {
    const updatedEquipement = {
      ...editedEquipement,
      dateArrivee: editedDateArrivee,
      role: editedRole,
      ordinateur: editedOrdinateur,
      station: editedStation,
      ecranSupp: editedEcranSupp,
      telephone: editedTelephone,
      casque: editedCasque,
    };

    onUpdateEquipement(updatedEquipement);

    setEditMode(false);
    setEditedEquipement(null);
    resetEditedValues();
  };
  //Gère la réinitialisation des valeurs modifiées
  const resetEditedValues = () => {
    setEditedDateArrivee("");
    setEditedRole("");
    setEditedOrdinateur("");
    setEditedStation(false);
    setEditedEcranSupp(0);
    setEditedTelephone("");
    setEditedCasque(false);
  };

  //Affichage de la liste des emploéys
  return (
    <div class="mb-10 p-5 border-2 border-black bg-white rounded-lg">
      <h2 class="mb-2 p-5 text-xl font-bold border-2 border-black bg-white rounded-lg">
        Liste des employés
      </h2>
      {equipementSelectionne.map((equipement, index) => (
        <div
          key={index}
          class=" p-5 border-2 border-black bg-white rounded-lg mb-2"
        >
          <h3 class="font-bold mb-2">Employé {index + 1}</h3>
          <p>Date d'arrivée : {equipement.dateArrivee}</p>
          <p>Rôle : {equipement.role}</p>
          <p>Type d'ordinateur : {equipement.ordinateur}</p>
          {equipement.station && <p>Station d'accueil : Oui</p>}
          <p>Nombre d'écrans supplémentaires : {equipement.ecranSupp}</p>
          <p>Téléphone : {equipement.telephone}</p>
          {equipement.casque && <p>Casque : Oui</p>}
          {editMode && editedEquipement === equipement ? (
            <div>
              {/* <input
                type="text"
                value={editedDateArrivee}
                onChange={(event) => setEditedDateArrivee(event.target.value)}
              />
              <input
                type="text"
                value={editedRole}
                onChange={(event) => setEditedRole(event.target.value)}
              />
              <input
                type="text"
                value={editedOrdinateur}
                onChange={(event) => setEditedOrdinateur(event.target.value)}
              />
              <label>
                Station d'accueil :
                <input
                  type="checkbox"
                  checked={editedStation}
                  onChange={(event) => setEditedStation(event.target.checked)}
                />
              </label>
              <input
                type="number"
                value={editedEcranSupp}
                onChange={(event) =>
                  setEditedEcranSupp(parseInt(event.target.value))
                }
              />
              <input
                type="text"
                value={editedTelephone}
                onChange={(event) => setEditedTelephone(event.target.value)}
              />
              <label>
                Casque :
                <input
                  type="checkbox"
                  checked={editedCasque}
                  onChange={(event) => setEditedCasque(event.target.checked)}
                />
              </label> */}
              <button onClick={handleSaveEdit}>Enregistrer</button>
              <button onClick={handleCancelEdit}>Annuler</button>
            </div>
          ) : (
            <div class="mt-1 flex items-center justify-center">
              {/* <button
                onClick={() => handleEdit(equipement)}
                class="bg-green-800 p-2 border-2 border-black rounded-md text-white font-bold hover:bg-green-600"
              >
                Modifier
              </button> */}
              <button
                onClick={() => handleDelete(equipement)}
                class="bg-green-800 p-2 border-2 border-black rounded-md text-white font-bold hover:bg-green-600"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AffichageEmploye;
