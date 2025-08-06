from datetime import datetime

# Lista para armazenar os grupos
grupos = []

def criar_grupo():
    nome = input("Digite o nome do grupo: ")
    descricao = input("Digite a descrição do grupo: ")
   
    novo_grupo = {
        "nome": nome,
        "descricao": descricao,
        "data_criacao": datetime.now(),
        "membros": []  # Lista de membros (inicialmente vazia)
    }
   
    grupos.append(novo_grupo)
    print("\nGrupo '{}' criado com sucesso!".format(nome))

def adicionar_membro():
    if not grupos:
        print("\nNenhum grupo cadastrado. Crie um grupo primeiro!")
        return
   
    print("\nGrupos disponiveis:")
    for i, grupo in enumerate(grupos, start=1):
        print("{}. {}".format(i, grupo['nome']))
   
    try:
        escolha = int(input("\nEscolha o numero do grupo: ")) - 1
        grupo_selecionado = grupos[escolha]
    except (ValueError, IndexError):
        print("\nOpção inválida!")
        return
   
    nome_membro = input("Digite o nome do novo membro: ")
   
    # Pede o nivel de contribuição (1 a 5)
    while True:
        try:
            nivel = int(input("Nivel de contribuição (1 a 5): "))
            if 1 <= nivel <= 5:
                break
            else:
                print("Digite um valor entre 1 e 5!")
        except ValueError:
            print("Digite um numero válido!")
   
    # Adiciona o membro com data de entrada e nivel
    grupo_selecionado["membros"].append({
        "nome": nome_membro,
        "data_entrada": datetime.now(),
        "nivel_contribuicao": nivel
    })
   
    print("\n'{}' foi adicionado ao grupo '{}' (Nivel: {})!".format(nome_membro, grupo_selecionado['nome'], nivel))

def listar_grupos():
    if not grupos:
        print("\nNenhum grupo cadastrado.")
        return
   
    print("\nLISTA DE GRUPOS:")
    for grupo in grupos:
        print("\nNome: {}".format(grupo['nome']))
        print("Criado em: {}".format(grupo['data_criacao'].strftime('%d/%m/%Y %H:%M')))
        print("Membros ({}):".format(len(grupo['membros'])))
       
        for membro in grupo["membros"]:
            print("   - {} (Nivel: {}, entrou em: {})".format(
                membro['nome'],
                membro['nivel_contribuicao'],
                membro['data_entrada'].strftime('%d/%m/%Y')))

def menu():
    while True:
        print("\n=== MENU ===")
        print("1. Criar grupo")
        print("2. Adicionar membro a um grupo")
        print("3. Ver todos os grupos")
        print("4. Sair")
       
        opcao = input("Escolha uma opção: ")
       
        if opcao == "1":
            criar_grupo()
        elif opcao == "2":
            adicionar_membro()
        elif opcao == "3":
            listar_grupos()
        elif opcao == "4":
            print("Saindo... Até logo!")
            break
        else:
            print("Opção inválida. Tente novamente!")
menu()






























from datetime import datetime

class Evento:
    def __init__(self, nome, organizador, categoria, localizacao, titulo, descricao, data_inicio, data_fim, capacidade):
        self.nome = nome
        self.organizador = organizador
        self.categoria = categoria
        self.localizacao = localizacao
        self.titulo = titulo
        self.descricao = descricao
        self.data_inicio = data_inicio
        self.data_fim = data_fim
        self.capacidade = capacidade
        self.participantes = []

    def adicionar_participante(self, nome_participante):
        if len(self.participantes) < self.capacidade:
            self.participantes.append(nome_participante)
            return True
        else:
            return False

    def exibir_detalhes(self):
        print("\n=== Detalhes do Evento ===")
        print(f"Nome: {self.nome}")
        print(f"Organizador: {self.organizador}")
        print(f"Categoria: {self.categoria}")
        print(f"Localização: {self.localizacao}")
        print(f"Título: {self.titulo}")
        print(f"Descrição: {self.descricao}")
        print(f"Data de Início: {self.data_inicio.strftime('%d/%m/%Y %H:%M')}")
        print(f"Data de Término: {self.data_fim.strftime('%d/%m/%Y %H:%M')}")
        print(f"Capacidade: {self.capacidade} pessoas")
        print(f"Vagas disponíveis: {self.capacidade - len(self.participantes)}")
       
        if self.participantes:
            print("\nParticipantes:")
            for i, participante in enumerate(self.participantes, 1):
                print(f"{i}. {participante}")
        else:
            print("\nNenhum participante inscrito ainda.")

def criar_evento():
    print("\n--- Cadastro de Novo Evento ---")
    nome = input("Nome do evento: ")
    organizador = input("Organizador: ")
    categoria = input("Categoria: ")
    localizacao = input("Localização: ")
    titulo = input("Título: ")
    descricao = input("Descrição: ")
   
    while True:
        try:
            data_inicio = input("Data de início (DD/MM/AAAA HH:MM): ")
            data_inicio = datetime.strptime(data_inicio, "%d/%m/%Y %H:%M")
           
            data_fim = input("Data de término (DD/MM/AAAA HH:MM): ")
            data_fim = datetime.strptime(data_fim, "%d/%m/%Y %H:%M")
           
            if data_fim <= data_inicio:
                print("A data de término deve ser após a data de início!")
                continue
               
            break
        except ValueError:
            print("Formato de data inválido. Use DD/MM/AAAA HH:MM")
   
    while True:
        try:
            capacidade = int(input("Capacidade máxima de participantes: "))
            if capacidade <= 0:
                print("A capacidade deve ser maior que zero!")
                continue
            break
        except ValueError:
            print("Por favor, digite um número válido.")
   
    return Evento(nome, organizador, categoria, localizacao, titulo, descricao,
                 data_inicio, data_fim, capacidade)

def menu():
    eventos = []
   
    while True:
        print("\n=== Sistema de Gerenciamento de Eventos ===")
        print("1. Cadastrar novo evento")
        print("2. Listar todos os eventos")
        print("3. Inscrever participante em evento")
        print("4. Visualizar detalhes de um evento")
        print("5. Sair")
       
        opcao = input("Escolha uma opção: ")
       
        if opcao == "1":
            novo_evento = criar_evento()
            eventos.append(novo_evento)
            print("\nEvento cadastrado com sucesso!")
           
        elif opcao == "2":
            if not eventos:
                print("\nNenhum evento cadastrado ainda.")
            else:
                print("\n=== Eventos Cadastrados ===")
                for i, evento in enumerate(eventos, 1):
                    print(f"\nEvento #{i}")
                    print(f"Nome: {evento.nome}")
                    print(f"Organizador: {evento.organizador}")
                    print(f"Data: {evento.data_inicio.strftime('%d/%m/%Y')} a {evento.data_fim.strftime('%d/%m/%Y')}")
                    print(f"Local: {evento.localizacao}")
                    print(f"Vagas: {evento.capacidade - len(evento.participantes)}/{evento.capacidade}")
       
        elif opcao == "3":
            if not eventos:
                print("\nNenhum evento disponível para inscrição.")
                continue
               
            print("\n=== Eventos Disponíveis ===")
            for i, evento in enumerate(eventos, 1):
                vagas = evento.capacidade - len(evento.participantes)
                print(f"{i}. {evento.nome} ({vagas} vagas disponíveis)")
           
            try:
                escolha = int(input("Selecione o evento (número): ")) - 1
                if 0 <= escolha < len(eventos):
                    participante = input("Nome do participante: ")
                    if eventos[escolha].adicionar_participante(participante):
                        print(f"\n{participante} foi inscrito no evento {eventos[escolha].nome}!")
                    else:
                        print("\nEvento lotado! Não foi possível realizar a inscrição.")
                else:
                    print("\nNúmero de evento inválido!")
            except ValueError:
                print("\nPor favor, digite um número válido.")
       
        elif opcao == "4":
            if not eventos:
                print("\nNenhum evento cadastrado ainda.")
                continue
               
            print("\n=== Eventos Cadastrados ===")
            for i, evento in enumerate(eventos, 1):
                print(f"{i}. {evento.nome}")
           
            try:
                escolha = int(input("Selecione o evento para ver detalhes (número): ")) - 1
                if 0 <= escolha < len(eventos):
                    eventos[escolha].exibir_detalhes()
                else:
                    print("\nNúmero de evento inválido!")
            except ValueError:
                print("\nPor favor, digite um número válido.")
       
        elif opcao == "5":
            print("Saindo do sistema...")
            break
       
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    menu()













































    from datetime import datetime

class Usuario:
    def __init__(self, nome, email, senha):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.data_cadastro = datetime.now()
        self.perfil = Perfil(nome)

    def exibir_dados(self):
        print("\n=== Dados do Usuario ===")
        print(f"Nome: {self.nome}")
        print(f"Email: {self.email}")
        print(f"Data de Cadastro: {self.data_cadastro.strftime('%d/%m/%Y %H:%M:%S')}")
        self.perfil.exibir_perfil()

class Perfil:
    def __init__(self, nome_usuario, biografia="", data_nascimento=None):
        self.nome_usuario = nome_usuario
        self.biografia = biografia
        self.data_nascimento = data_nascimento

    def exibir_perfil(self):
        print("\n=== Perfil do Usuario ===")
        print(f"Nome de Usuario: {self.nome_usuario}")
        print(f"Biografia: {self.biografia}")
        if self.data_nascimento:
            print(f"Data de Nascimento: {self.data_nascimento.strftime('%d/%m/%Y')}")
        else:
            print("Data de Nascimento: Não informada")

def criar_usuario():
    print("\n--- Cadastro de Novo Usuario ---")
    nome = input("Nome completo: ")
    email = input("Email: ")
    senha = input("Senha: ")
   
    usuario = Usuario(nome, email, senha)
   
    print("\n--- Configuração do Perfil ---")
    nome_usuario = input("Nome de usuario: ")
    biografia = input("Biografia: ")
    data_nasc = input("Data de nascimento (DD/MM/AAAA): ")
   
    try:
        if data_nasc:
            data_nasc = datetime.strptime(data_nasc, "%d/%m/%Y").date()
    except ValueError:
        print("Formato de data invalido. A data de nascimento não sera salva.")
        data_nasc = None
   
    usuario.perfil = Perfil(nome_usuario, biografia, data_nasc)
   
    return usuario

def menu():
    usuarios = []
   
    while True:
        print("\n=== Sistema de Usuarios ===")
        print("1. Cadastrar novo usuario")
        print("2. Listar usuarios cadastrados")
        print("3. Sair")
       
        opcao = input("Escolha uma opção: ")
       
        if opcao == "1":
            novo_usuario = criar_usuario()
            usuarios.append(novo_usuario)
            print("\nUsuario cadastrado com sucesso!")
        elif opcao == "2":
            if not usuarios:
                print("\nNenhum usuario cadastrado ainda.")
            else:
                print("\n=== Usuarios Cadastrados ===")
                for i, usuario in enumerate(usuarios, 1):
                    print(f"\nUsuario #{i}")
                    usuario.exibir_dados()
        elif opcao == "3":
            print("Saindo do sistema...")
            break
        else:
            print("Opção invalida. Tente novamente.")

if __name__ == "__main__":
    menu()