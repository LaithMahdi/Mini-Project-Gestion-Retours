import { EDGE_INFO } from "@/constants";

export type DataType = {
  data: {
    data: Array<Item>;
    edgeInfo: EDGE_INFO;
  };
};

export type Item = {
  client: string;
  date: string;
  etatTraitement: string;
  id: number;
  produit: string;
  raison: string;
};

export const ETAT_TRAITEMENT_META: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  EN_ATTENTE: {
    label: "En attente",
    className: "border-amber-400/40 bg-amber-500/15 text-amber-300",
  },
  APPROUVE: {
    label: "Approuvé",
    className: "border-emerald-400/40 bg-emerald-500/15 text-emerald-300",
  },
  REFUSE: {
    label: "Refusé",
    className: "border-rose-400/40 bg-rose-500/15 text-rose-300",
  },
  REMBOURSE: {
    label: "Remboursé",
    className: "border-sky-400/40 bg-sky-500/15 text-sky-300",
  },
  ECHANGE: {
    label: "Échangé",
    className: "border-violet-400/40 bg-violet-500/15 text-violet-300",
  },
  EN_COURS_VERIFICATION: {
    label: "En cours de vérification",
    className: "border-cyan-400/40 bg-cyan-500/15 text-cyan-300",
  },
  REMBOURSEMENT_EN_ATTENTE: {
    label: "Remboursement en attente",
    className: "border-orange-400/40 bg-orange-500/15 text-orange-300",
  },
  PRODUIT_RECU: {
    label: "Produit reçu",
    className: "border-indigo-400/40 bg-indigo-500/15 text-indigo-300",
  },
};
