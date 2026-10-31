<script>
  import { marked } from 'marked';

  let { text = '', inline = false } = $props();
  // Sumber markdown berasal dari file repo sendiri (bukan input pengguna), jadi aman dirender sebagai HTML.
  let html = $derived(inline ? marked.parseInline(text || '') : marked.parse(text || ''));
</script>

<div class="prose">{@html html}</div>
