# Chonoko — onde paramos

Atualizado em 25/11/2026. Última publicação na Vercel: Etapa 01 (refinamento visual), commit `52743c3`.

## Links

| O quê | Endereço |
|---|---|
| Prévia do site (protegida) | https://chonoko-prototipo.vercel.app |
| Painel da equipe | https://chonoko-prototipo.vercel.app/admin |
| Projeto na Vercel | time **3SURE** (`3-sure`) → projeto **chonoko-prototipo** |
| Código | branch `claude/laughing-gates-hvrh22`, pasta `clients/chonoko/site` |

**Link de compartilhamento para as proprietárias.** Ele dá acesso sem conta na Vercel e tem o formato
`https://chonoko-prototipo.vercel.app/?x-vercel-protection-bypass=SEGREDO&x-vercel-set-bypass-cookie=true`.
O segredo **não fica no repositório**. Para consultá-lo ou revogá-lo: Vercel → chonoko-prototipo → Settings →
Deployment Protection → *Protection Bypass for Automation* (o que tem a nota "Link de prévia para as proprietárias").

## Estado atual

- Site completo: cardápio real dos PDFs (83 produtos), WhatsApp (51) 99669-5981, avaliações ilustrativas,
  novidades vindas do painel e localização.
- Painel `/admin` em modo demonstração: dados salvos no navegador, sem login real.
- A prévia é publicada pela CLI da Vercel (`vercel deploy`), não pela integração com o Git. Para atualizar, é preciso publicar de novo.
- Na nuvem, o ambiente do Claude Code `sites-cafeterias-restaurantes` libera a Vercel e guarda o token.

## Pendências de segurança (fazer na Vercel)

- [x] Apagar o 1º token (o que foi colado no chat). Feito: só resta o token "PREVIA CHONOKO".
- [x] Apagar o segredo de bypass sem nota. Feito: só resta o das proprietárias, agora marcado como principal.

## Próximos ajustes (combinar)

- [x] Etapa 01: refinamento visual do site e do painel (publicada).
- [ ] Aviso "1 Insight" do Next.js no painel, só no modo de desenvolvimento. Não afeta a prévia.
- [x] Carregar mais cedo a foto principal da abertura.
- [ ] Dados da Chonoko: endereço, horários, cafés e bebidas, ano de fundação (1988?), pontos de `cardapio-extraido.md`.
- [ ] Futuro: banco de dados e login reais no painel (ver `site/README.md`) e plano/hospedagem para a versão oficial.
