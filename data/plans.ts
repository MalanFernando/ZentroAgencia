import raw from "./plans.json";
import type { PlansContent } from "@/types/content";

const plansData = raw as unknown as PlansContent;
export default plansData;
