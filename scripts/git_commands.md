### Adiciona e faz commit do HTML editado
git add .
git commit -m "Edit HTML file"

### Move o arquivo HTML diretamente para a pasta docs
mv scripts/UE902_2_LucasLima.html docs/

### Adiciona e faz commit da mudança de pasta
git add docs/UE902_2_LucasLima.html
git commit -m "Move HTML file to docs folder for GitHub Pages"

### Envia tudo para o GitHub
git push origin main


---

### Sequência final sugerida:

```bash
# Adiciona e faz commit do HTML editado
git add scripts/UE902_2_LucasLima.html
git commit -m "Edit HTML file"

# Move o arquivo HTML diretamente para a pasta docs
mv scripts/UE902_2_LucasLima.html docs/

# Adiciona e faz commit da mudança de pasta
git add docs/UE902_2_LucasLima.html
git commit -m "Move HTML file to docs folder for GitHub Pages"

# Envia tudo para o GitHub
git push origin main
```

---

### Por que é mais eficiente:
1. **`git add` seletivo**: Ao invés de `git add .` (que inclui tudo), você está adicionando **somente os arquivos relevantes**, o que evita adicionar arquivos temporários ou não desejados.
2. **Menos etapas redundantes**: Movendo o arquivo e fazendo o commit logo em seguida evita o uso desnecessário de `git add .` duas vezes.
3. **Clareza**: Cada etapa está bem descrita e direta.

---

### Caso você sempre repita o processo:
Se você quiser **automatizar** isso, pode colocar esses comandos em um arquivo de script chamado `deploy_html.sh` (caso use o terminal Bash no Linux, Mac ou Git Bash no Windows).

#### Conteúdo do `deploy_html.sh`:
```bash
#!/bin/bash

# Adiciona e faz commit do HTML editado
git add scripts/UE902_2_LucasLima.html
git commit -m "Edit HTML file"

# Move o arquivo HTML diretamente para a pasta docs
mv scripts/UE902_2_LucasLima.html docs/

# Adiciona e faz commit da mudança de pasta
git add docs/UE902_2_LucasLima.html
git commit -m "Move HTML file to docs folder for GitHub Pages"

# Envia tudo para o GitHub
git push origin main

echo "HTML atualizado e enviado com sucesso!"
```

#### Como usar o script:
1. Salve o conteúdo em um arquivo chamado `deploy_html.sh`.
2. Torne o script executável:
   ```bash
   chmod +x deploy_html.sh
   ```
3. Execute o script sempre que quiser:
   ```bash
   ./deploy_html.sh
   ```

---

Dessa forma, com um único comando (`./deploy_html.sh`), todo o processo será executado! 🚀

Aqui está um **roteiro passo a passo** para criar uma página no GitHub usando **Git**, semelhante ao processo que fizemos. Vou documentar **todos os comandos** necessários e explicar cada etapa.

---

## **Roteiro para Criar e Publicar uma Página no GitHub**

### **1. Criar um repositório no GitHub**
- Vá até o [GitHub](https://github.com) e crie um **novo repositório**:
   - Nome do repositório: `nome_projeto` (por exemplo: `UE902_2_DataViz_SIGMA`).
   - Escolha a opção "Public".
   - NÃO adicione o `README` ou outros arquivos no momento (vamos usar o Git).

---

### **2. Inicializar o projeto localmente com Git**
No seu terminal ou console (Git Bash, PowerShell, RStudio Terminal):

1. **Navegue até a pasta do projeto**:
   ```bash
   cd caminho/para/seu/projeto
   ```

2. **Inicialize o Git** na pasta:
   ```bash
   git init
   ```

3. **Adicione o repositório remoto** do GitHub:
   ```bash
   git remote add origin https://github.com/seu-usuario/nome_projeto.git
   ```
   Substitua `seu-usuario` pelo seu usuário GitHub e `nome_projeto` pelo nome do repositório.

4. **Verifique se o repositório remoto foi adicionado**:
   ```bash
   git remote -v
   ```

---

### **3. Configurar o `.gitignore`**
Crie um arquivo `.gitignore` para evitar enviar arquivos temporários desnecessários.

1. **Crie o arquivo `.gitignore`**:
   ```bash
   echo ".Rproj.user
.Rhistory
.RData
.Ruserdata
*.csv
*.tmp
*.prop
*.pper
*.log
" > .gitignore
   ```

2. **Adicione o `.gitignore` ao controle de versão**:
   ```bash
   git add .gitignore
   git commit -m "Add .gitignore to exclude unnecessary files"
   ```

---

### **4. Criar a estrutura de pastas**
Certifique-se de ter uma pasta `docs/` para armazenar o HTML que será a página.

1. **Crie a pasta `docs`** (caso não exista):
   ```bash
   mkdir docs
   ```

2. **Mova seu arquivo HTML** para essa pasta:
   ```bash
   mv caminho/atual/seu_arquivo.html docs/
   ```

---

### **5. Commit e envio do projeto para o GitHub**
Agora, vamos enviar todos os arquivos relevantes para o GitHub.

1. **Adicione todos os arquivos** ao controle de versão:
   ```bash
   git add .
   ```

2. **Faça o commit das alterações**:
   ```bash
   git commit -m "Initial commit with project files and HTML page"
   ```

3. **Envie os arquivos para o repositório no GitHub**:
   ```bash
   git push -u origin main
   ```

---

### **6. Ativar o GitHub Pages**
1. No GitHub, vá até as **Configurações** (*Settings*) do repositório.
2. Role até a seção **GitHub Pages**.
3. Em **Source** (Fonte), escolha a opção **Branch: main** e a pasta **docs/**.
4. Aguarde alguns minutos até que o GitHub Pages publique a sua página.

---

### **7. Acessar sua página**
Após a publicação, o GitHub Pages fornecerá um link como este:
```
https://seu-usuario.github.io/nome_projeto/
```
Substitua `seu-usuario` pelo seu nome de usuário e `nome_projeto` pelo nome do repositório.

---

## **Resumo dos Comandos**
```bash
cd caminho/para/seu/projeto
git init
git remote add origin https://github.com/seu-usuario/nome_projeto.git

echo ".Rproj.user
.Rhistory
.RData
.Ruserdata
*.csv
*.tmp
*.prop
*.pper
*.log
" > .gitignore

mkdir docs
mv caminho/atual/seu_arquivo.html docs/

git add .
git commit -m "Initial commit with project files and HTML page"
git push -u origin main
```

---

### **Automatizar as próximas edições**
Quando você editar o arquivo HTML, siga estes comandos:

```bash
git add docs/seu_arquivo.html
git commit -m "Update HTML page"
git push origin main
```

Pronto! A página será automaticamente atualizada no GitHub Pages. 🚀