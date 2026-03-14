declare module 'estree' {
  export interface Node {
    type: string;
    loc?: any;
    range?: [number, number];
  }
}