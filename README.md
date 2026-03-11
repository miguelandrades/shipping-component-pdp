# Shipping Calculator Component - GHFLY Business Case

Esta é uma solução de cálculo de frete desenvolvida para otimizar a conversão em Páginas de Produto (PDP), focando em performance, UX e arquitetura escalável.

## 🚀 Tecnologias Utilizadas

- **Next.js 14 (App Router)**: Escolhido pela excelente performance e SEO.
- **Tailwind CSS**: Para uma interface mobile-first e responsiva.
- **TypeScript**: Garantindo segurança de tipos e melhor manutenção.
- **Lucide React**: Ícones leves e consistentes.
- **Vercel**: Deployment contínuo (CI/CD).

## 🧠 Decisões de Arquitetura

- **Custom Hooks**: Toda a lógica de negócio foi extraída para o `useShipping.ts`, separando a responsabilidade de "como calcular" (Controller) de "como exibir" (View).
- **Lazy State Initialization**: Otimização de performance no `useState` para sincronizar o estado com o `localStorage` sem causar renderizações em cascata.
- **Máscara Nativa**: Implementação de regex própria para o CEP, reduzindo o bundle size ao evitar bibliotecas externas desnecessárias.

## 📈 Foco em Negócio (UX & Conversão)

- **Persistência de Dados**: O CEP é salvo no `localStorage`, garantindo que o usuário não precise digitar novamente ao navegar pela loja.
- **Feedback Visual**: Estados de loading e tratamento de erro claro para reduzir a fricção e o abandono de carrinho.
- **Acessibilidade**: Uso de atributos ARIA e tags semânticas.
