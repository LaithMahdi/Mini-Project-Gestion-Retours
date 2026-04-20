import {
  Alert02Icon,
  Clock04Icon,
  Package02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

export const APP_COLOR: string = "#00A6F4";
export const APP_NAME = "Gestion des retours";

export const APP_META = {
  title: APP_NAME,
  description:
    "Application de gestion des retours pour les clients et les administrateurs.",
};

export const ITEMS_PER_PAGE: number = 10;

export const MONTHS: { label: string; value: string }[] = [
  { label: "Janvier", value: "1" },
  { label: "Février", value: "2" },
  { label: "Mars", value: "3" },
  { label: "Avril", value: "4" },
  { label: "Mai", value: "5" },
  { label: "Juin", value: "6" },
  { label: "Juillet", value: "7" },
  { label: "Août", value: "8" },
  { label: "Septembre", value: "9" },
  { label: "Octobre", value: "10" },
  { label: "Novembre", value: "11" },
  { label: "Décembre", value: "12" },
];

export const ETAT_TRAITEMENT_OPTIONS: { label: string; value: string }[] = [
  { label: "Tous les états", value: "ALL" },
  { label: "En attente", value: "EN_ATTENTE" },
  { label: "Approuvé", value: "APPROUVE" },
  { label: "Refusé", value: "REFUSE" },
  { label: "Remboursé", value: "REMBOURSE" },
  { label: "Échangé", value: "ECHANGE" },
  { label: "En cours de vérification", value: "EN_COURS_VERIFICATION" },
  {
    label: "Remboursement en attente",
    value: "REMBOURSEMENT_EN_ATTENTE",
  },
  { label: "Produit reçu", value: "PRODUIT_RECU" },
];

export interface EDGE_INFO {
  hasNext: boolean;
  hasPrevious: boolean;
  totalItems: number;
  currentPage: number;
}

export const ENTITIES = [
  {
    icon: Package02Icon,
    title: "Retour Produit",
    accent: "from-cyan-300/30 to-cyan-500/10 border-cyan-300/30",
    points: [
      "ID unique",
      "Reference client",
      "Raison du retour",
      "Etat du traitement",
    ],
    description:
      "Centralise chaque retour avec les donnees client, produit, motif et statut.",
  },
  {
    icon: Alert02Icon,
    title: "Non-conformite",
    accent: "from-amber-300/30 to-amber-500/10 border-amber-300/30",
    points: [
      "Description detaillee",
      "Niveau de gravite",
      "Produit concerne",
      "Actions correctives",
    ],
    description:
      "Documente les anomalies et priorise leur resolution selon l impact metier.",
  },
  {
    icon: UserGroupIcon,
    title: "Utilisateur",
    accent: "from-emerald-300/30 to-emerald-500/10 border-emerald-300/30",
    points: [
      "Profil utilisateur",
      "Role assigne",
      "Permissions",
      "Etat d activation",
    ],
    description:
      "Controle l acces avec une gouvernance claire des roles et droits systeme.",
  },
  {
    icon: Clock04Icon,
    title: "Historique Retour",
    accent: "from-fuchsia-300/30 to-fuchsia-500/10 border-fuchsia-300/30",
    points: [
      "Journal d actions",
      "Employe responsable",
      "Date precise",
      "Audit complet",
    ],
    description:
      "Assure la tracabilite de bout en bout pour les besoins qualite et compliance.",
  },
];
