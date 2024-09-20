//Used  to populate dropdowns in Items.jsx
export const statuses = [
  "Välj",
  "Inventerad",
  "Inventerad - i byggnad",
  "Inventerad - i lager/förråd",
  "Mängdad",
  "Mängdad - i byggnad",
  "Mängdad - i lager/förråd",
  "På rekonditionering",
  "I lager",
  "Bevarad (slutstatus)",
  "Återbrukad i projektet (slutstatus)",
  "Återbrukad inom organisationen (slutstatus)",
  "Återbrukad externt av annan aktör (slutstatus)",
  "Avfallshanterad (slutstatus)",
];

export const marketPlaces = [
  "Välj",
  "Ej publicerad",
  "Publicerad som intern annons",
  "Publicerad som extern annons",
  "Reserverad",
  "Såld",
  "Avpublicerad",
  "Automatiskt publicerad",
];

export const demountabilities = [
  "Välj",
  "Enkel att demontera/demontering krävs ej",
  "Demonteringsbar men specialverktyg kan krävas",
  "Begränsad demonterbarhet",
];

export const accessibilities = [
  "Välj",
  "Lätt åtkomlig",
  "Åtkomlig men planering och specialverktyg kan krävas",
  "Begränsad åtkomlighet",
];

export const egenskaperPollare = [
  ["CE-märkning", ["Ej Angivet", "Ja", "Nej"]],
  [
    "IP-klass",
    [
      "Ej Angivet",
      "IP20",
      "IP23",
      "IP43/44/45",
      "IP54/55",
      "IP66",
      "IP67",
      "IP68",
    ],
  ],
  [
    "Ljuskälla",
    ["Ej Angivet", "Halogen", "LED", "Kompaktlysrör", "Metallhalogen"],
  ],
  ["Färgtemperatur", ["2700K", "3000K", "3500K", "4000K", "5000K"]],
];
