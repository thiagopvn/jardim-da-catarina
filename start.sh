#!/bin/bash

# Script para inicializar o projeto do Convite da Catarina

echo "🌸 Iniciando o Convite do Jardim Encantado da Catarina..."
echo ""

# Verifica se o node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    echo ""
fi

# Verifica se o arquivo .env.local existe
if [ ! -f ".env.local" ]; then
    echo "⚠️  ATENÇÃO: Arquivo .env.local não encontrado!"
    echo "📝 Criando arquivo .env.local a partir do exemplo..."
    cp .env.local.example .env.local
    echo ""
    echo "🔑 Por favor, adicione suas credenciais do Firebase no arquivo .env.local"
    echo "   Abra o arquivo e preencha as variáveis necessárias."
    echo ""
    echo "Após configurar, execute novamente este script."
    exit 1
fi

# Inicia o servidor de desenvolvimento
echo "🚀 Iniciando servidor de desenvolvimento..."
echo "🌐 Acesse: http://localhost:3000"
echo "👑 Admin: http://localhost:3000/admin"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
echo ""

npm run dev