export type Accuracy = "exact" | "approx" | "unknown";
export type Answer = number;

export interface EncounterState {
  nickname: string;
  answers: Answer[];
  meetingAccuracy: Accuracy | "";
  meetingDate: string;
  meetingDateRange: string;
  finalChoice: "yes" | "maybe" | "";
}

export const initialEncounter: EncounterState = {
  nickname: "", answers: [], meetingAccuracy: "", meetingDate: "",
  meetingDateRange: "", finalChoice: "",
};

export const questions = [
  { kicker: "QUESTION 01 · 04", lines: ["如果凌晨 2:13，", "CC 突然给你发：", "“在吗”"], options: ["秒回", "怎么了？", "明天再说", "装没看见"] },
  { kicker: "QUESTION 02 · 04", lines: ["如果 CC 明天突然中了 1000 万，", "你觉得她最可能先做什么？"], options: ["立刻辞职", "先发个朋友圈", "研究怎么赚到下一个 1000 万", "请我吃饭"] },
  { kicker: "QUESTION 03 · 04", lines: ["如果一定要选，", "你觉得我们现在更像——"], options: ["刚认识", "普通朋友", "挺熟的", "好朋友", "损友", "有点说不清"] },
  { kicker: "QUESTION 04 · 04", lines: ["如果我们有一天突然很久不联系了，", "你会——"], options: ["没什么", "偶尔想起", "主动找我", "大概会有一点不习惯"] },
];

export function hashSeed(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) { hash ^= value.charCodeAt(i); hash = Math.imul(hash, 16777619); }
  return hash >>> 0;
}

export function seeded(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => { t += 0x6d2b79f5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
}

export function results(state: EncounterState) {
  const seed = hashSeed(`${state.nickname}|${state.meetingDate}|${state.answers.join("-")}`);
  const rnd = seeded(seed);
  const [a = 1, b = 1, relation = 2, distance = 1] = state.answers;
  const closeness = relation / 5;
  const scores = {
    chemistry: Math.round(62 + closeness * 27 + a * 2 + rnd() * 5),
    chatter: Math.round(59 + closeness * 28 + (b === 3 ? 5 : 0) + rnd() * 6),
    lostRisk: Math.round(Math.max(8, 44 - closeness * 27 - distance * 6 + rnd() * 8)),
    adventure: Math.round(56 + closeness * 25 + (b === 2 ? 7 : 0) + rnd() * 8),
    stability: Math.round(58 + closeness * 28 + distance * 4 + rnd() * 5),
  };
  const labels = relation >= 4 ? ["高危损友", "失联不了型朋友", "嘴上嫌弃型朋友"] : relation === 3 ? ["可能会认识很久的人", "长期战略饭搭子", "高浓度废话关系"] : relation === 5 ? ["系统暂时无法定义", "关系定义失败", "随机但稳定的关系"] : ["普通但珍贵的朋友", "随机但稳定的关系", "可能会认识很久的人"];
  const label = labels[seed % labels.length];
  const ending = relation === 4 ? "损友" : relation === 3 ? "好朋友" : relation === 5 ? "有点说不清" : distance <= 1 ? "很久没联系" : "普通朋友";
  return { seed, scores, label, ending };
}

export function daysSince(date: string) {
  const then = new Date(`${date}T00:00:00`);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Number.isFinite(then.getTime()) ? Math.max(1, Math.floor((today.getTime() - then.getTime()) / 86400000) + 1) : 1;
}

export function formatDate(date: string) { return date ? date.replaceAll("-", ".") : "—"; }

export const endings: Record<string, string[]> = {
  "普通朋友": ["我不知道我们以后会认识多久。", "但至少到今天，", "这段时间是真的。"],
  "好朋友": ["以后还有很多事情会变。", "但希望几年以后回头看，", "你的名字还在。"],
  "损友": ["虽然有时候挺想把你删了。", "但目前看来，", "暂时没有这个打算。"],
  "很久没联系": ["我们可能已经没有以前那么常说话了。", "但“很久没联系”，", "和“没有认识过”，是两回事。"],
  "有点说不清": ["系统算了很久。", "还是没弄明白我们是什么。", "算了。", "有些关系，好像也没必要急着定义。"],
};
