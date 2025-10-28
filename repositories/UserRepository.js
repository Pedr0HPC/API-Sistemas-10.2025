const BaseRepository = require("./BaseRepository");

/**
 * Classe filha (Filho) que herda de BaseRepository.
 *
 * Ela automaticamente "ganha" todos os métodos (getAll, getById, create, etc.)
 * da classe Pai (BaseRepository).
 *
 * No futuro, se você precisar de uma lógica *específica* para usuários
 * (ex: buscar por email), você pode adicionar esse método aqui.
 */
class UserRepository extends BaseRepository {
  constructor() {
    // Chama o construtor da classe Pai (BaseRepository)
    super();
    console.log("UserRepository (filho) inicializado.");
    // Você pode pré-popular com dados, se quiser:
    this.create({ nome: "Ana (Exemplo)", email: "ana@exemplo.com" });
    this.create({ nome: "Carlos (Exemplo)", email: "carlos@exemplo.com" });
  }

  // Por enquanto, não precisamos de nenhum método adicional.
  // Já herdamos todo o CRUD!

  // Exemplo de método específico (se necessário no futuro):
  // findByEmail(email) {
  //   return this.items.find(user => user.email === email);
  // }
}

// Exportamos uma *instância* única (Singleton) do repositório.
// Isso garante que todos os lugares da aplicação usem o mesmo
// array de usuários em memória.
module.exports = new UserRepository();
