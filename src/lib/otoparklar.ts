import veri from "../../otoparklar.json";

export interface Otopark {
  id: number;
  ad: string;
  ilce: string;
  kapasite: number;
  dolu: number;
  saatlikUcret: number;
  tip: "acik" | "kapali";
}

export const otoparklar = veri as Otopark[];

export const dolulukYuzdesi = (o: Otopark) =>
  Math.round((o.dolu / o.kapasite) * 100);

export const bosYer = (o: Otopark) => o.kapasite - o.dolu;
