const BaseRepository = require("./BaseRepository");

/**
 * Classe filha (Filho) que herda de BaseRepository.
 *
 * Ela automaticamente "ganha" todos os métodos (getAll, getById, create, etc.)
 * da classe Pai (BaseRepository).
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
}
module.exports = new UserRepository();
