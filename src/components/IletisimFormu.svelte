<script lang="ts">
  // İletişim formu: gönderimde sahte bildirim gösterir ve alanları temizler
  let isim = $state("");
  let eposta = $state("");
  let konu = $state("");
  let mesaj = $state("");
  let gonderildi = $state(false);

  const gecerli = $derived(
    isim.trim() !== "" && eposta.includes("@") && konu.trim() !== "" && mesaj.trim() !== "",
  );

  function gonder(e: SubmitEvent) {
    e.preventDefault();
    if (!gecerli) return;
    gonderildi = true;
    isim = eposta = konu = mesaj = "";
    setTimeout(() => (gonderildi = false), 4000);
  }
</script>

<div class="sayfa">
  <h1>İletişim</h1>
  <p class="alt">Soru, öneri veya geri bildirimlerinizi bize yazın.</p>

  {#if gonderildi}
    <div class="kart bildirim">✅ Mesajınız iletildi. Teşekkür ederiz!</div>
  {/if}

  <form class="kart form" onsubmit={gonder}>
    <label>
      İsim
      <input type="text" bind:value={isim} placeholder="Adınız Soyadınız" />
    </label>
    <label>
      E-posta
      <input type="email" bind:value={eposta} placeholder="ornek@mail.com" />
    </label>
    <label>
      Konu
      <input type="text" bind:value={konu} placeholder="Konu başlığı" />
    </label>
    <label>
      Mesaj
      <textarea rows="5" bind:value={mesaj} placeholder="Mesajınız"></textarea>
    </label>
    <button class="btn" type="submit" disabled={!gecerli}>Gönder</button>
  </form>
</div>

<style>
  h1 {
    margin: 0;
    font-size: 22px;
  }

  .alt {
    margin: 0;
    color: var(--yazi-soluk);
    font-size: 14px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--kenar);
    border-radius: var(--radius);
    background: var(--zemin);
    color: var(--yazi);
    font-weight: 400;
    resize: vertical;
  }

  .bildirim {
    padding: 14px;
    border-color: #22c55e;
  }
</style>
