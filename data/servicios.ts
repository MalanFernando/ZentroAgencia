import raw from "./servicios.json";
import type { ServiciosContent } from "@/types/content";

const serviciosData = raw as unknown as ServiciosContent;
export default serviciosData;
