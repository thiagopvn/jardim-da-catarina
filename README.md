# 🌸 Convite Digital - Jardim Encantado da Princesa Catarina

Um convite de aniversário interativo e mágico para celebrar o primeiro aninho da Catarina, com animações encantadoras e um painel administrativo para gerenciamento de confirmações de presença.

## ✨ Características

### Página do Convite
- **Animação de Abertura**: Flor que desabrocha revelando o convite
- **Borboletas Animadas**: Voando pela tela com trilhas de brilho
- **Efeito Pó de Pirlimpimpim**: Interativo ao toque/clique
- **Contador Regressivo**: Mostra o tempo restante para a festa
- **Formulário RSVP**: Confirmação de presença integrada
- **Sugestões de Presentes**: Categorias interativas com modal
- **Design Mobile-First**: Totalmente responsivo
- **Música de Fundo**: Com controle de áudio

### Painel Administrativo
- **Autenticação Segura**: Login com Firebase Auth
- **Dashboard em Tempo Real**: Estatísticas atualizadas automaticamente
- **Gestão de Convidados**: Visualização de confirmações e recusas
- **Exportação de Dados**: Download em formato CSV
- **Interface Intuitiva**: Design limpo e organizado

## 🎨 Paleta de Cores

- **Rosa Candy**: #FFB6C1
- **Lilás Candy**: #E6E6FA
- **Azul Candy**: #87CEEB
- **Verde Água Candy**: #98FB98
- **Dourado**: #FFD700

## 🛠 Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utility-first
- **Framer Motion**: Animações complexas
- **Three.js/React Three Fiber**: Efeitos 3D
- **Firebase**: Backend (Firestore + Authentication)
- **React Hook Form**: Gerenciamento de formulários
- **Lucide React**: Ícones modernos
- **date-fns**: Manipulação de datas

## 📦 Instalação

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/seu-usuario/convite-catarina.git
cd convite-catarina
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - Ative Authentication (Email/Password)
   - Crie um banco Firestore
   - Copie \`.env.local.example\` para \`.env.local\`
   - Adicione suas credenciais do Firebase

4. Configure o admin inicial:
   - No Firebase Console, vá para Authentication
   - Adicione um usuário com email e senha
   - Use essas credenciais para fazer login em \`/admin\`

## 🚀 Executando o Projeto

### Desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`
Acesse [http://localhost:3000](http://localhost:3000)

### Build de Produção:
\`\`\`bash
npm run build
npm run start
\`\`\`

## 📱 Páginas

- \`/\` - Convite interativo
- \`/login\` - Login administrativo
- \`/admin\` - Painel de administração (protegido)

## 🔧 Configuração do Firebase

### Regras do Firestore:
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // RSVPs podem ser criados por qualquer um, mas apenas lidos por admins
    match /rsvps/{document} {
      allow create: if true;
      allow read: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
  }
}
\`\`\`

### Estrutura da Coleção RSVP:
\`\`\`typescript
interface RSVP {
  name: string
  willAttend: boolean
  adults: number
  children: number
  message?: string
  timestamp: Timestamp
}
\`\`\`

## 🎁 Personalização

### Alterando Informações da Festa:
Edite em \`app/page.tsx\`:
- Data da festa: \`partyDate\`
- Local: \`partyLocation\`
- Link do Google Maps: \`mapUrl\`

### Modificando Cores:
Edite em \`tailwind.config.ts\` as cores da paleta candy

### Adicionando Música:
1. Adicione o arquivo MP3 em \`public/sounds/\`
2. Implemente o player de áudio em \`app/page.tsx\`

## 📤 Deploy

### Vercel (Recomendado):
1. Faça push do código para o GitHub
2. Conecte o repositório ao [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático a cada push

### Configuração de Domínio:
1. No Vercel, adicione seu domínio personalizado
2. Configure os DNS conforme instruções
3. SSL é configurado automaticamente

## 🔒 Segurança

- Variáveis de ambiente não são expostas no cliente
- Autenticação protege rotas administrativas
- Firestore rules limitam acesso aos dados
- Sanitização de inputs no formulário

## 📊 Analytics (Opcional)

Para adicionar analytics:
1. Instale: \`npm install @vercel/analytics\`
2. Adicione ao layout principal
3. Monitore métricas no dashboard Vercel

## 🐛 Troubleshooting

### Erro de Firebase:
- Verifique as credenciais em \`.env.local\`
- Confirme que Firestore está ativado
- Verifique as regras de segurança

### Animações lentas:
- Reduza número de borboletas
- Desative efeitos parallax em mobile
- Otimize imagens

## 📄 Licença

MIT - Sinta-se livre para usar e modificar!

## 💕 Créditos

Desenvolvido com amor para a princesa Catarina 👑🌸

---

**Nota**: Este é um projeto pessoal para celebrar um momento especial. A magia está nos detalhes! ✨