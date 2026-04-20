import { EDGE_INFO } from "@/constants";

export type DataType = {
  data: {
    data: Array<Item>;
    edgeInfo: EDGE_INFO;
  };
};

export type Item = {
  id: number;
  description: string;
  gravite: Gravite;
  date: string;
  productId: number;
};

export enum Gravite {
  ELEVEE = "ELEVEE",
  MOYENNE = "MOYENNE",
  FAIBLE = "FAIBLE",
  CRITIQUE = "CRITIQUE",
}
