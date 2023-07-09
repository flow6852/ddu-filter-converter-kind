import {
  BaseFilter,
  DduItem,
  SourceOptions,
  KindOptions,
} from "https://deno.land/x/ddu_vim@v3.3.3/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.3.3/deps.ts";

type KindKeyReplace = {
    oldKey: unknown;
    newKey: unknown;
};

type Params = {
    kind: string,
    kindKeyReplace: KindKeyReplace // 
    options: KindOptions,
    otionsOverride: boolean,
    params: unknown, // ?
    paramsOverride: boolean, // ?
};

export class Filter extends BaseFilter<Params> {
  // deno-lint-ignore require-await
  override async filter(args: {
    denops: Denops;
    sourceOptions: SourceOptions;
    filterParams: Params,
    input: string;
    items: DduItem[];
  }): Promise<DduItem[]> {
    for (const item of args.items) {
        item.kind = args.filterParams.kind;
    }
    return Promise.resolve(args.items);
  }

  override params(): Params {
    return {
        kind: "base"
    };
  }
}
