/**
 * Classe base (Pai) que implementa a lógica de CRUD.
 * Ela gerencia uma lista de itens em memória, incluindo a geração de IDs
 */
class BaseRepository {
  constructor() {
    this.items = []; // Array para guardar os dados em memória
    this.nextId = 1; // Contador para o próximo ID
    console.log("BaseRepository inicializado.");
  }

  /**
   * Retorna todos os itens.
   */
  getAll() {
    return this.items;
  }

  /**
   * Busca um item específico pelo ID.
   * @param {number} id - O ID do item a ser buscado.
   */
  getById(id) {
    // Converte o ID para número, pois os parâmetros da rota vêm como string
    const numericId = parseInt(id, 10);
    return this.items.find((item) => item.id === numericId);
  }

  /**
   * Cria um novo item.
   * @param {object} item - O objeto (sem ID) a ser criado.
   */
  create(item) {
    const newItem = {
      id: this.nextId++, // Atribui o ID atual e incrementa o contador
      ...item, // Copia as outras propriedades (ex: nome)
      criadoEm: new Date().toISOString(), // Adiciona um timestamp
    };
    this.items.push(newItem);
    return newItem; // Retorna o item recém-criado com ID
  }

  /**
   * Atualiza um item existente.
   * @param {number} id - O ID do item a ser atualizado.
   * @param {object} updatedData - O objeto com os dados atualizados.
   */
  update(id, updatedData) {
    const numericId = parseInt(id, 10);
    const itemIndex = this.items.findIndex((item) => item.id === numericId);

    if (itemIndex === -1) {
      return null; // Retorna nulo se não encontrar
    }

    // Pega o item antigo
    const oldItem = this.items[itemIndex];

    // Cria o item atualizado, mantendo o ID original
    // e mesclando os dados antigos com os novos
    const updatedItem = {
      ...oldItem,
      ...updatedData,
      id: oldItem.id, // Garante que o ID não seja sobrescrito
      atualizadoEm: new Date().toISOString(),
    };

    this.items[itemIndex] = updatedItem; // Substitui o item no array
    return updatedItem;
  }

  /**
   * Deleta um item pelo ID.
   * @param {number} id - O ID do item a ser deletado.
   */
  delete(id) {
    const numericId = parseInt(id, 10);
    const itemIndex = this.items.findIndex((item) => item.id === numericId);

    if (itemIndex === -1) {
      return false; // Retorna falso se não encontrar
    }

    // Remove o item do array
    this.items.splice(itemIndex, 1);
    return true; // Retorna verdadeiro em caso de sucesso
  }
}

module.exports = BaseRepository;