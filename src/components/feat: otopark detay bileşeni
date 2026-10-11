<script lang="ts">
  // Otopark detay: süre, plaka ve başlangıç zamanı seçimi
  import { type Etkinlik, tarihYaz, tl } from "$lib/data";
  import { dolulukYuzdesi, bosYer, type Otopark } from "$lib/otoparklar";
  import { sepet } from "$lib/sepet.svelte";

  let { otopark: o }: { otopark: Otopark } = $props();

  const sureler = [1, 2, 3, 4, 8];

  let saat = $state(2);
  let plaka = $state("");
  let baslangic = $state("");

  const yuzde = $derived(dolulukYuzdesi(o));
  const bos = $derived(bosYer(o));
  const toplam = $derived(o.saatlikUcret * saat);
  const renk = $derived(
    yuzde >= 90
      ? "linear-gradient(135deg, #ef4444, #7f1d1d)"
      : yuzde >= 60
        ? "linear-gradient(135deg, #f59e0b, #78350f)"
        : "linear-gradient(135deg, #22c55e, #14532d)",
  );
  const hazir = $derived(bos > 0 && plaka.trim().length >= 5 && baslangic !== "");

  function rezerveEt() {
    if (!hazir) return;

    // Sepet ve bilet sistemi etkinlik şeklinde çalıştığı için otoparkı o şekle çeviriyoruz
    const etkinlik: Etkinlik = {
      id: o.id,
      baslik: o.ad,
      kategori: "Otopark",
      tarih: baslangic,
      mekan: `${o.ilce}, ${o.tip === "kapali" ? "Kapalı" : "Açık"} otopark`,
      sehir: "İstanbul",
      renk,
      aciklama: `${o.ad} için park yeri rezervasyonu`,
      biletler: [],
    };
    const bilet = {
      ad: `${saat} saat · ${plaka.trim().toUpperCase()}`,
      fiyat: o.saatlikUcret * saat,
    };

    sepet.ekle(etkinlik, bilet, 1);
    window.location.href = "/sepet";
  }
</script>

<div class="afis" style:background={renk}>
  <span>{o.tip === "kapali" ? "Kapalı otopark" : "Açık otopark"}</span>
  <h1>{o.ad}</h1>
</div>

<div class="sayfa">
  <div class="kart bilgi">
    <p>📍 {o.ilce}, İstanbul</p>
    <p>🚗 %{yuzde} dolu · {bos > 0 ? `${bos} boş yer` : "Yer kalmadı"}</p>
    <p>💰 {tl(o.saatlikUcret)} / saat</p>
  </div>

  <h2>Başlangıç zamanı</h2>
  <input class="alan" type="datetime-local" bind:value={baslangic} />
  {#if baslangic}
    <p class="not">{tarihYaz(baslangic)}</p>
  {/if}

  <h2>Süre seçin</h2>
  {#each sureler as s}
    <label class="kart secenek" class:aktif={saat === s}>
      <input type="radio" name="sure" value={s} bind:group={saat} />
      <span>{s} saat</span>
      <strong>{tl(o.saatlikUcret * s)}</strong>
    </label>
  {/each}

  <h2>Plaka</h2>
  <input class="alan" type="text" placeholder="34 ABC 123" maxlength="12" bind:value={plaka} />

  <button class="btn" onclick={rezerveEt} disabled={!hazir}>
    {bos === 0 ? "Yer yok" : `Rezerve et · ${tl(toplam)}`}
  </button>
</div>

<style>
  .afis {
    padding: 48px 16px 20px;
    color: #fff;
  }

  .afis span {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.85;
  }

  .afis h1 {
    margin: 4px 0 0;
    font-size: 24px;
  }

  .bilgi {
    padding: 14px;
  }

  .bilgi p {
    margin: 4px 0;
  }

  h2 {
    margin: 8px 0 -4px;
    font-size: 17px;
  }

  .alan {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--kenar);
    border-radius: var(--radius);
    background: var(--kart);
    color: var(--yazi);
  }

  .not {
    margin: 0;
    font-size: 13px;
    color: var(--yazi-soluk);
  }

  .secenek {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px;
    cursor: pointer;
  }

  .secenek.aktif {
    border-color: var(--renk-ana);
    box-shadow: 0 0 0 1px var(--renk-ana);
  }

  .secenek input {
    accent-color: var(--renk-ana);
  }

  .secenek span {
    flex: 1;
  }

  .btn:disabled {
    opacity: 0.5;
  }
</style>
