import { GaiaEngine } from "../engineRunner";

export type GaiaPlugin<S, C> = {
  setup(engine: GaiaEngine<S, C>): () => void;
};
