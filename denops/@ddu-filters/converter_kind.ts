import {
  BaseFilter,
  DduItem,
  KindOptions,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v3.3.3/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.3.3/deps.ts";

type KindKeyReplace = {
  oldKey: string;
  newKey: string;
};

type Params = {
  kind?: string;
  kindKeyReplaces?: Array<KindKeyReplace>; //
  options?: KindOptions; // can change?
  otionsOverride?: boolean;
  params?: unknown; // can change?
  paramsOverride?: boolean; // ?
};

export class Filter extends BaseFilter<Params> {
  // deno-lint-ignore require-await
  override async filter(args: {
    denops: Denops;
    sourceOptions: SourceOptions;
    filterParams: Params;
    input: string;
    items: DduItem[];
  }): Promise<DduItem[]> {
    for (const item of args.items) {
      if (args.filterParams.kind != undefined) {
        item.kind = args.filterParams.kind;
      }
      // if (args.filterParams.kindKeyReplaces) {
      //     for (const replacer of args.filterParams.kindKeyReplaces as Array<KindKeyReplace>){
      //         item.action[replacer.newKey] = item.action[replacer.oldKey] // "." is ignored for using dict member? then format : ([0-9a-zA-Z]*.)*
      //     }
      // }
    }
    return Promise.resolve(args.items);
  }

  override params(): Params {
    return {
      kind: undefined,
      kindKeyReplaces: undefined,
      options: undefined,
      otionsOverride: undefined,
      params: undefined,
      paramsOverride: undefined,
    };
  }
}

function parseKeys(keys: string): Array<string> {
    return keys.split
}
