export type Witness = {
  name: string;
  email: string;
};
export interface Form {
  amount: number;
  allocation: number;
  damagedParts: string[];
  category: string;
  witnesses: Witness[];
}
export enum DAMAGED_PARTS_LABELS {
  ROOF = "Roof",
  FRONT = "Front",
  SIDE = "Side",
  REAR = "Rear",
}

export enum DAMAGED_PARTS_VALUES {
  ROOF = "roof",
  FRONT = "front",
  SIDE = "side",
  REAR = "rear",
}
