# Agenda de eventos – Mais Formaturas

Calendário interativo de eventos (um único `index.html`, sem instalação) que:

- mostra o mês em três visões: **Mês**, **Semana** (grade por hora) e **Agenda** (lista, padrão no celular);
- sinaliza **conflitos** (horários que se sobrepõem) e **proximidades** (até 2h entre o fim de um evento e o início de outro), sempre entre **todos** os eventos;
- filtra por **coordenadora** e por **tipo de evento**, com busca e "só eventos com alerta";
- guarda os filtros no endereço, então dá para mandar o link já filtrado.

## Como ele calcula os alertas

- **Conflito:** os dois eventos se sobrepõem (inclusive os que começam no mesmo horário).
- **Proximidade:** o intervalo entre o fim de um e o início do outro é de até o limite (1h, 1h30, 2h ou 3h; padrão 2h).
- A lista de eventos só traz o horário de **início**. Quando a coluna *Fim* está vazia, a página usa uma duração padrão por tipo: Missa 1h30, Culto 1h30, Solenidade 2h, Aula da Saudade 2h, Baile 5h. Tudo isso se ajusta no botão **Regras de alerta** (fica salvo no navegador).
- Eventos **sem horário** ("a confirmar") não entram nos alertas e aparecem tracejados e na aba "A confirmar".
- Os alertas são calculados sobre todos os eventos, mesmo com filtro ligado: filtrar uma coordenadora não esconde o choque com outra.

## Planilha (qualquer pessoa edita)

1. Crie uma planilha no Google Sheets: **Arquivo > Importar > Upload** e escolha `eventos.csv`.
2. Colunas (não troque os nomes): `Data` (dd/mm/aaaa), `Início` (ex.: 19:00), `Fim` (opcional), `Tipo`, `Evento`, `Contrato`, `Local`, `Coordenadora`, `Formandos`, `Observações`. Horário vazio = "a confirmar". Para baile que passa da meia-noite, preencha o `Fim` (ex.: 05:00).
3. **Compartilhar:** "Qualquer pessoa com o link" como **Editor**.
4. **Arquivo > Compartilhar > Publicar na Web**, escolha a aba e o formato **CSV**, e copie o link.
5. No `index.html`, cole esse link em `CONFIG.SHEET_CSV_URL` (e o link normal da planilha em `SHEET_EDIT_URL` para aparecer o botão "Editar planilha"). A página relê a planilha a cada 2 minutos e ao voltar para a aba.

Novas coordenadoras e tipos aparecem sozinhos nos filtros.

## Publicar no GitHub

```powershell
cd C:\Users\PC\Documents\calendario-eventos
git init
git add index.html eventos.csv embed.mjs README.md fonts .gitignore
git commit -m "Agenda de eventos"
gh repo create calendario-eventos --private --source . --push
```

Depois, no repositório: **Settings > Pages > Deploy from a branch > main / (root)**.

### Atenção à privacidade

- Repositório privado **não deixa a página privada**: o GitHub Pages publica o site para qualquer pessoa com o link (só o plano Enterprise Cloud restringe o acesso). Pages a partir de repositório privado também exige plano pago (Pro/Team).
- O link CSV "Publicar na Web" da planilha é público para quem o tiver.
- O `index.html` e o `eventos.csv` levam a lista de eventos de dezembro. Se isso for sensível, esvazie o `eventos.csv` (deixe só o cabeçalho), rode `node embed.mjs` e use apenas a planilha.

## Arquivos

- `index.html` – a página inteira (HTML, CSS e JavaScript).
- `eventos.csv` – modelo da planilha e lista de dezembro/2026.
- `embed.mjs` – copia o `eventos.csv` para dentro do `index.html` como cópia de segurança (rode `node embed.mjs` depois de editar o CSV). A página tenta, nesta ordem: planilha online, `eventos.csv`, cópia salva.
- `fonts/` – fonte Figtree (licença OFL), servida junto com a página.
