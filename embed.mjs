// Copia o conteúdo de eventos.csv para dentro do index.html (cópia de segurança da página).
// Uso: node embed.mjs   — rode sempre que mudar o eventos.csv do projeto.
import { readFileSync, writeFileSync } from 'node:fs';
const csv = readFileSync(new URL('./eventos.csv', import.meta.url), 'utf8').replace(/<\/script/gi, '<\\/script');
const path = new URL('./index.html', import.meta.url);
const html = readFileSync(path, 'utf8');
const re = /(<script type="text\/csv" id="snapshot">)[\s\S]*?(<\/script>)/;
if (!re.test(html)) throw new Error('Bloco snapshot não encontrado no index.html');
writeFileSync(path, html.replace(re, (_, a, b) => a + csv.trimEnd() + b));
console.log('Snapshot atualizado:', csv.trim().split(/\r?\n/).length - 1, 'linhas de eventos.');
