export type GaiaVector = { x: number; y: number; z?: number };
export type GaiaTick = { now: number; delta: number; frame: number };
export type GaiaEvent<T extends string = string, P = unknown> = {
  type: T;
  payload: P;
  at: number;
};

export interface GaiaBehavior<S = unknown, C = unknown> {
  id: string;
  describe?(state: S, ctx: C): string;
  step(state: S, tick: GaiaTick, ctx: C): S;
}
