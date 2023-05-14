import React, { useState } from "react";
import AffichageEmploye from "./AffichageEmploye";
import "./App.css";
import InsertionEmploye from "./insertionEmploye";
import logo from "./logo.svg";

function App() {
  //Liste des equipements/Employé sélectionnés
  const [equipementSelectionne, setEquipementSelectionne] = useState([]);

  //Suppression d'un équipement/employé
  const handleDeleteEquipement = (equipement) => {
    const updatedEquipements = equipementSelectionne.filter(
      (item) => item !== equipement
    );
    setEquipementSelectionne(updatedEquipements);
  };

  //Mise à jour d'un équipement/employé
  const handleUpdateEquipement = (updatedEquipement) => {
    const updatedEquipements = equipementSelectionne.map((equipement) => {
      if (equipement === updatedEquipement) {
        return updatedEquipement;
      } else {
        return equipement;
      }
    });
    setEquipementSelectionne(updatedEquipements);
  };

  //Ajout d'un équipement/employé a la liste
  const handleEquipementSelect = (equipement) => {
    setEquipementSelectionne([...equipementSelectionne, equipement]);
  };

  return (
    <body>
      <div class="flex flex-col items-center justify-center py-2">
        <InsertionEmploye onEquipementSelect={handleEquipementSelect} />
      </div>
      <div class="flex flex-col items-center justify-center mb-2">
        <AffichageEmploye
          equipementSelectionne={equipementSelectionne}
          onDeleteEquipement={handleDeleteEquipement}
          onUpdateEquipement={handleUpdateEquipement}
        />
      </div>
    </body>
  );
}

export default App;
