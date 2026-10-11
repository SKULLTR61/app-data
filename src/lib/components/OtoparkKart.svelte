<script lang="ts">
  import { dolulukYuzdesi, bosYer, type Otopark } from "$lib/otoparklar";
  import { tl } from "$lib/data";

  let { otopark }: { otopark: Otopark } = $props();

  const yuzde = $derived(dolulukYuzdesi(otopark));
  const bos = $derived(bosYer(otopark));
  const durum = $derived(yuzde >= 90 ? "kirmizi" : yuzde >= 60 ? "sari" : "yesil");
</script>

<a href="/otopark/{otopark.id}" class="kart otopark">
  <div class="ust">
    <div>
      <h3>{otopark.ad}</h3>
      <p>{otopark.ilce} · {otopark.tip === "kapali" ? "Kapalı" : "Açık"} otopark</p>
    </div>
    <strong class="ucret">{tl(otopark.saatlikUcret)}<small>/saat</small></strong>
  </div>

  <div class="cubuk">
    <div class="dolgu {durum}" style:width="{yuzde}%"></div>
  </div>

  <div class="satir">
    <span>%{yuzde} dolu</span>
    <span>{bos > 0 ? `${bos} boş yer` : "Dolu"}</span>
  </div>
</a>

<style>
  .otopark {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
  }

  .ust {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  h3 {
    margin: 0 0 4px;
    font-size: 17px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--yazi-soluk);
  }

  .ucret {
    color: var(--renk-ana);
    font-size: 15px;
    white-space: nowrap;
  }

  .ucret small {
    font-size: 12px;
    font-weight: 400;
    color: var(--yazi-soluk);
  }

  .cubuk {
    height: 8px;
    border-radius: 999px;
    background: var(--kenar);
    overflow: hidden;
  }

  .dolgu {
    height: 100%;
    border-radius: 999px;
  }

  .yesil { background: #22c55e; }
  .sari { background: #f59e0b; }
  .kirmizi { background: #ef4444; }

  .satir {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: var(--yazi-soluk);
  }
</style>
