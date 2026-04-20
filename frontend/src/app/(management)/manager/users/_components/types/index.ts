import { EDGE_INFO } from "@/constants";

export type DataType = {
  data: {
    data: Array<Item>;
    edgeInfo: EDGE_INFO;
  };
};

export type Item = {
  id: string;
  nom: string;
  email: string;
  role: string;
  roleDisplayName: string;
  enabled: boolean;
};
