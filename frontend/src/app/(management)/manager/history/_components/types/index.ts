import { EDGE_INFO } from "@/constants";

export type DataType = {
  data: {
    data: Array<Item>;
    edgeInfo: EDGE_INFO;
  };
};

export type Item = {
  id: number;
  retourId: number;
  action: string;
  employeId: string;
  employeNom: string;
  employeEmail: string;
  date: string;
};

export type HistoryDataType = {
  data: {
    data: Array<UserItem>;
  };
};

export type UserItem = {
  id: string;
  nom: string;
  role: string;
};

export type RetourDataType = {
  data: {
    data: Array<RetourItem>;
  };
};

export type RetourItem = {
  id: string;
  produit: string;
};
