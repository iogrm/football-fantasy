import Recrutment from '../sequelize/model/recrutment.model';

export default abstract class RecrutmentDao {
  static convert = (model: Recrutment): RecrutmentOutputType => {
    return model.toJSON();
  };

  static convertMany = (models: Recrutment[]): RecrutmentOutputType[] => {
    return models.map((model) => this.convert(model));
  };
}
