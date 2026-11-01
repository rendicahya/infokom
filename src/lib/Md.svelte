<script>
  import { marked } from 'marked';
  import { miringkanHtml } from './asing.js';

  let { text = '', inline = false } = $props();
  // Sumber markdown berasal dari file repo sendiri (bukan input pengguna), jadi aman dirender sebagai HTML.
  // Istilah asing dimiringkan setelah dirender.
  let html = $derived(miringkanHtml(inline ? marked.parseInline(text || '') : marked.parse(text || '')));
</script>

<div class="prose">{@html html}</div>
