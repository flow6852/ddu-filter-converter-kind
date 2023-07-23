import {
  BaseFilter,
  DduItem,
  SourceOptions,
} from "https://deno.land/x/ddu_vim@v3.4.3/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.4.3/deps.ts";

type ActionData = {
  [K in string]: string;
};

type KindKeyCopy = {
  oldKey: string;
  newKey: string;
};

type Params = {
  kind?: string;
  kindKeyCopy?: Array<KindKeyCopy>; //
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
      if (args.filterParams.kindKeyCopy) {
        for (
          const copy of args.filterParams.kindKeyCopy as Array<
            KindKeyCopy
          >
        ) {
          setActionData(
            item.action as ActionData,
            copy.newKey,
            getActionData(item.action as ActionData, copy.oldKey),
          );
        }
      }
    }
    return Promise.resolve(args.items);
  }

  override params(): Params {
    return {
      kind: undefined,
      kindKeyCopy: undefined,
      options: undefined,
      otionsOverride: undefined,
      params: undefined,
      paramsOverride: undefined,
    };
  }
}

// item をunknownにしているけどこれやめたい
function setActionData(item: unknown, keys: string, setData: unknown): void {
  const parsed = keys.split(".");
  const root = parsed.pop();
  if (root == undefined) return;
  else if (parsed.length < 1) item[root] = setData;
  else setActionData(item[root], parsed.join("."), setData);
}

function getActionData(item: unknown, keys: string): unknown {
  const parsed: Array<string> = keys.split(".");
  const root = parsed.pop();

  if (root == undefined) return "";
  else if (parsed.length < 1) return item[root];
  else return getActionData(item[root], parsed.join("."));
}
