import { Button, Container, Divider, Paper, Stack } from "@mui/material";
import { useState } from "react";
import PlusIcon from "@mui/icons-material/Add";
import MoinsIcon from "@mui/icons-material/Remove";
import ResetIcon from "@mui/icons-material/Autorenew";
import AgrandirJaugeIcon from "@mui/icons-material/VerticalAlignTop";
import ReduireJaugeIcon from "@mui/icons-material/VerticalAlignBottom";
import "./app.css";

export default function App() {
  const [valeurMaximum, definirValeurMaximum] = useState(
    +window.localStorage.getItem("valeurMaximumJaugeAlya") || 5
  );
  const [valeur, definirValeur] = useState(
    +window.localStorage.getItem("valeurJaugeAlya") || 0
  );

  const definirLaValeurEtLaStocker = function (nouvelleValeur) {
    const nouvelleValeurValide = Math.max(
      Math.min(nouvelleValeur, valeurMaximum),
      0
    );
    definirValeur(nouvelleValeurValide);
    window.localStorage.setItem("valeurJaugeAlya", nouvelleValeurValide);
  };

  const definirLaValeurMaximumEtLaStocker = function (nouvelleValeur) {
    const nouvelleValeurValide = Math.max(nouvelleValeur, valeur, 0);

    definirValeurMaximum(nouvelleValeurValide);
    window.localStorage.setItem("valeurMaximumJaugeAlya", nouvelleValeurValide);
  };

  return (
    <Container>
      <Stack
        direction="column"
        spacing={2}
        sx={{ width: 300, mx: "auto", mt: 2 }}
      >
        <Bouton
          petit
          couleur="darkgrey"
          quandJeClique={() =>
            definirLaValeurMaximumEtLaStocker(valeurMaximum + 1)
          }
        >
          <AgrandirJaugeIcon />
        </Bouton>
        <Divider />
        <Bouton
          couleur="#333"
          quandJeClique={() => definirLaValeurEtLaStocker(valeur + 1)}
        >
          <PlusIcon />
        </Bouton>
        <Jauge valeur={valeur} maximum={valeurMaximum} />
        <Bouton
          couleur="#333"
          quandJeClique={() => definirLaValeurEtLaStocker(valeur - 1)}
        >
          <MoinsIcon />
        </Bouton>
        <Bouton
          couleur="darkgrey"
          quandJeClique={() => definirLaValeurEtLaStocker(0)}
        >
          <ResetIcon />
        </Bouton>
        <Divider />
        <Bouton
          petit
          couleur="darkgrey"
          quandJeClique={() =>
            definirLaValeurMaximumEtLaStocker(valeurMaximum - 1)
          }
        >
          <ReduireJaugeIcon />
        </Bouton>
      </Stack>
    </Container>
  );
}

function Bouton({ quandJeClique, couleur, children, petit }) {
  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: couleur, alignSelf: petit ? "center" : "stretch" }}
      onClick={quandJeClique}
      size={petit ? "small" : "normal"}
    >
      {children}
    </Button>
  );
}

function Jauge({ valeur, maximum }) {
  return (
    <Stack direction="column" spacing={0.5} height={400}>
      {[...Array(maximum)].map((_, numero) => (
        <Ligne
          key={numero}
          couleur={recupererCouleurEnFonctionDuNumero(numero, maximum)}
          laLigneEstElleActive={maximum - numero <= valeur}
        />
      ))}
    </Stack>
  );
}

function Ligne({ couleur, laLigneEstElleActive }) {
  return (
    <Paper
      sx={{ flex: 1, backgroundColor: laLigneEstElleActive ? couleur : "grey" }}
    />
  );
}

function recupererCouleurEnFonctionDuNumero(numero, maximum) {
  // const fourchetteDeTeinte = [0, 100];
  const teinte = 100 * (numero / (maximum - 1));

  return `hsl(${teinte} 100% 60%)`;
}
