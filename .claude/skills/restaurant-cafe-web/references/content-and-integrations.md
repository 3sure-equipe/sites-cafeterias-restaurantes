# Conteúdo e integrações

## Conteúdo estruturado
Manter dados do estabelecimento separados dos componentes. Exemplo conceitual:

```ts
type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  category: string;
  available?: boolean;
};
```

Não mostrar preço ausente como R$ 0,00. Não mostrar produto indisponível como disponível. Se houver informação pendente, registrar em uma lista de conteúdo a confirmar.

## WhatsApp
- Confirmar número com DDD e país.
- Formatar número somente com dígitos no padrão internacional.
- Criar URL `https://wa.me/55DDDNUMERO`.
- Mensagem opcional deve ser codificada com `encodeURIComponent`.
- Não incluir número de exemplo no site final.
- Abrir em nova aba quando apropriado e informar ao usuário que sairá do site.

## Google Maps
- Confirmar endereço.
- Usar link oficial de busca/rota ou embed autorizado.
- Não adivinhar latitude/longitude.
- Exibir endereço como texto além do mapa.

## Avaliações
- Usar somente conteúdo real, autorizado e fiel à fonte.
- Identificar origem e, se necessário, data.
- Alternativamente, criar link para avaliações públicas, sem copiar depoimentos.

## Promoções
- Cada promoção deve ter título, descrição, validade, condições e status.
- Conferir datas antes de publicar.
- Não transformar preço regular em preço promocional sem confirmação.

## Privacidade
- Coletar o mínimo de dados.
- Se houver formulário, explicar sua finalidade e destino.
- Não implementar analytics, pixels ou cookies não essenciais sem considerar consentimento e obrigações legais aplicáveis.
